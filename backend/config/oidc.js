const { OAuth2Client } = require('google-auth-library');

// OpenID Connect Configuration
const oidcConfig = {
    // Google OpenID Connect Configuration
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        issuer: 'https://accounts.google.com',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
        jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
        scopes: ['openid', 'email', 'profile'],
        responseTypes: ['id_token'],
        grantTypes: ['authorization_code'],
        subjectTypes: ['public'],
        idTokenSigningAlgValues: ['RS256'],
        claimsSupported: [
            'iss', 'sub', 'aud', 'exp', 'iat', 'auth_time', 'nonce',
            'email', 'email_verified', 'name', 'given_name', 'family_name',
            'picture', 'locale', 'hd'
        ]
    },

    // Security settings
    security: {
        maxTokenAge: 300, // 5 minutes in seconds
        clockTolerance: 60, // 1 minute tolerance for clock skew
        requireEmailVerification: true,
        allowedDomains: null, // null = allow all domains, array = restrict to specific domains
        sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    },

    // Application-specific settings
    app: {
        redirectUri: process.env.FRONTEND_URL || 'http://localhost:3000',
        postLoginRedirect: '/',
        postLogoutRedirect: '/login',
        cookieSettings: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }
};

// Create Google OAuth2 client
const googleClient = new OAuth2Client(oidcConfig.google.clientId);

// Log configuration for debugging
console.log('OIDC Configuration:', {
    clientId: oidcConfig.google.clientId ? 'Configured' : 'NOT CONFIGURED',
    issuer: oidcConfig.google.issuer,
    environment: process.env.NODE_ENV || 'development'
});

if (!oidcConfig.google.clientId) {
    console.error('WARNING: Google Client ID is not configured! Please set GOOGLE_CLIENT_ID in your environment variables.');
}

// OpenID Connect token verification
const verifyOIDCToken = async (idToken, provider = 'google') => {
    try {
        console.log('Starting OIDC token verification for provider:', provider);

        if (provider !== 'google') {
            throw new Error('Unsupported OpenID Connect provider');
        }

        if (!oidcConfig.google.clientId) {
            throw new Error('Google Client ID not configured');
        }

        console.log('Verifying ID token with Google...');
        // Verify the ID token
        const ticket = await googleClient.verifyIdToken({
            idToken: idToken,
            audience: oidcConfig.google.clientId,
        });

        const payload = ticket.getPayload();
        console.log('Token payload received:', {
            iss: payload.iss,
            aud: payload.aud,
            email: payload.email,
            email_verified: payload.email_verified
        });

        // Validate OpenID Connect claims
        console.log('Validating OIDC claims...');
        const validation = validateOIDCClaims(payload, provider);
        if (!validation.valid) {
            throw new Error(`Invalid OpenID Connect claims: ${validation.error}`);
        }

        console.log('OIDC claims validated successfully');
        const claims = extractStandardClaims(payload);
        console.log('Standard claims extracted:', claims);

        return {
            valid: true,
            payload: payload,
            claims: claims
        };

    } catch (error) {
        console.error('OpenID Connect token verification failed:', error);
        return {
            valid: false,
            error: error.message
        };
    }
};

// Validate OpenID Connect claims according to specification
const validateOIDCClaims = (payload, provider = 'google') => {
    const config = oidcConfig[provider];
    const security = oidcConfig.security;

    // Required claims validation
    const requiredClaims = ['iss', 'sub', 'aud', 'exp', 'iat'];
    for (const claim of requiredClaims) {
        if (!payload[claim]) {
            return { valid: false, error: `Missing required claim: ${claim}` };
        }
    }

    // Issuer validation (Google may use either with or without https://)
    const validIssuers = ['https://accounts.google.com', 'accounts.google.com'];
    if (!validIssuers.includes(payload.iss)) {
        return { valid: false, error: `Invalid issuer: ${payload.iss}` };
    }

    // Audience validation (aud can be string or array per spec)
    const aud = payload.aud;
    const audienceOk = Array.isArray(aud)
        ? aud.includes(config.clientId)
        : aud === config.clientId;
    if (!audienceOk) {
        return { valid: false, error: `Invalid audience: ${aud}` };
    }

    // Token expiration validation
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now - security.clockTolerance) {
        return { valid: false, error: 'Token has expired' };
    }

    // Token age validation
    if (payload.iat < now - security.maxTokenAge - security.clockTolerance) {
        return { valid: false, error: 'Token is too old' };
    }

    // Email verification validation (only if email is present)
    if (payload.email && security.requireEmailVerification && !payload.email_verified) {
        return { valid: false, error: 'Email not verified' };
    }

    // Domain restriction validation (only if email is present and domains are restricted)
    if (payload.email && security.allowedDomains && Array.isArray(security.allowedDomains)) {
        const emailDomain = payload.email.split('@')[1];
        if (!security.allowedDomains.includes(emailDomain)) {
            return { valid: false, error: `Email domain not allowed: ${emailDomain}` };
        }
    }

    return { valid: true };
};

// Extract standard OpenID Connect claims
const extractStandardClaims = (payload) => {
    return {
        // Standard claims
        issuer: payload.iss || null,
        subject: payload.sub || null,
        audience: payload.aud || null,
        expiration: payload.exp || null,
        issuedAt: payload.iat || null,
        authTime: payload.auth_time || null,
        nonce: payload.nonce || null,

        // Profile claims
        email: payload.email || null,
        emailVerified: payload.email_verified || false,
        name: payload.name || null,
        givenName: payload.given_name || null,
        familyName: payload.family_name || null,
        picture: payload.picture || null,
        locale: payload.locale || null,

        // Google-specific claims
        hostedDomain: payload.hd || null,
        authorizedParty: payload.azp || null
    };
};

// Generate OIDC-compliant JWT for application use
const generateAppToken = (user, claims) => {
    const jwt = require('jsonwebtoken');

    const tokenPayload = {
        // Standard JWT claims
        iss: 'modgoviya-app',
        sub: user._id.toString(),
        aud: 'modgoviya-frontend',
        exp: Math.floor(Date.now() / 1000) + (oidcConfig.security.sessionTimeout / 1000),
        iat: Math.floor(Date.now() / 1000),

        // Application-specific claims
        userId: user._id,
        email: user.email,
        name: user.name,
        verified: user.isVerified,
        provider: user.authProvider,

        // OpenID Connect metadata
        oidc: true,
        originalIssuer: claims.issuer,
        originalSubject: claims.subject
    };

    return jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        algorithm: 'HS256'
    });
};

module.exports = {
    oidcConfig,
    verifyOIDCToken,
    validateOIDCClaims,
    extractStandardClaims,
    generateAppToken,
    googleClient
};
