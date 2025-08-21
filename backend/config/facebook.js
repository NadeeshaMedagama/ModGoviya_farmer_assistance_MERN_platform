const axios = require('axios');

// Facebook OAuth Configuration
const facebookConfig = {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/auth/facebook/callback',
    scopes: ['email', 'public_profile'],
    apiVersion: 'v18.0',
    endpoints: {
        authorization: 'https://www.facebook.com/v18.0/dialog/oauth',
        token: 'https://graph.facebook.com/v18.0/oauth/access_token',
        userInfo: 'https://graph.facebook.com/v18.0/me',
        debugToken: 'https://graph.facebook.com/v18.0/debug_token'
    }
};

// Validate Facebook configuration
if (!facebookConfig.appId || !facebookConfig.appSecret) {
    console.error('WARNING: Facebook App ID or App Secret is not configured! Please set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET in your environment variables.');
}

// Facebook OAuth helper functions
const facebookOAuth = {
    // Generate Facebook OAuth URL
    getAuthorizationUrl: (state) => {
        const params = new URLSearchParams({
            client_id: facebookConfig.appId,
            redirect_uri: facebookConfig.redirectUri,
            scope: facebookConfig.scopes.join(','),
            response_type: 'code',
            state: state || 'random_state_string'
        });
        
        return `${facebookConfig.endpoints.authorization}?${params.toString()}`;
    },

    // Exchange authorization code for access token
    getAccessToken: async (code) => {
        try {
            const params = new URLSearchParams({
                client_id: facebookConfig.appId,
                client_secret: facebookConfig.appSecret,
                redirect_uri: facebookConfig.redirectUri,
                code: code
            });

            const response = await axios.get(`${facebookConfig.endpoints.token}?${params.toString()}`);
            
            if (response.data.error) {
                throw new Error(response.data.error.message);
            }

            return response.data.access_token;
        } catch (error) {
            console.error('Error getting Facebook access token:', error);
            throw error;
        }
    },

    // Get user information from Facebook
    getUserInfo: async (accessToken) => {
        try {
            const params = new URLSearchParams({
                fields: 'id,name,email,picture.type(large)',
                access_token: accessToken
            });

            const response = await axios.get(`${facebookConfig.endpoints.userInfo}?${params.toString()}`);
            
            if (response.data.error) {
                throw new Error(response.data.error.message);
            }

            return response.data;
        } catch (error) {
            console.error('Error getting Facebook user info:', error);
            throw error;
        }
    },

    // Verify Facebook access token
    verifyAccessToken: async (accessToken) => {
        try {
            const params = new URLSearchParams({
                input_token: accessToken,
                access_token: `${facebookConfig.appId}|${facebookConfig.appSecret}`
            });

            const response = await axios.get(`${facebookConfig.endpoints.debugToken}?${params.toString()}`);
            
            if (response.data.error) {
                throw new Error(response.data.error.message);
            }

            return response.data.data;
        } catch (error) {
            console.error('Error verifying Facebook access token:', error);
            throw error;
        }
    }
};

module.exports = {
    facebookConfig,
    facebookOAuth
}; 