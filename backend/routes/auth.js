const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const { verifyOIDCToken, generateAppToken } = require('../config/oidc');
const { facebookOAuth } = require('../config/facebook');

const router = express.Router();

// Input validation for login
const loginValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

// Input validation for registration
const registerValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Login route with validation
router.post('/login', loginValidation, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Check if account is locked
        if (user.isLocked) {
            await user.incLoginAttempts();
            return res.status(423).json({ 
                success: false,
                message: 'Account temporarily locked due to too many failed login attempts' 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            await user.incLoginAttempts();
            return res.status(400).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Reset login attempts on successful login
        if (user.loginAttempts > 0) {
            await user.resetLoginAttempts();
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Create JWT token with shorter expiration
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            userId: user._id,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
});

// Register route with validation
router.post('/register', registerValidation, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        // Hash password with higher salt rounds
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            authProvider: 'local'
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            success: true,
            token,
            userId: user._id,
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during registration' 
        });
    }
});

// Google OAuth/OIDC route
router.post('/google', async (req, res) => {
    try {
        console.log('Google OAuth request received:', { body: req.body, headers: req.headers });
        
        const { credential } = req.body;

        if (!credential) {
            console.error('No credential provided in request');
            return res.status(400).json({
                success: false,
                message: 'Credential is required'
            });
        }

        console.log('Verifying OIDC token...');
        const verification = await verifyOIDCToken(credential, 'google');
        
        if (!verification.valid) {
            console.error('OIDC token verification failed:', verification.error);
            return res.status(400).json({
                success: false,
                message: 'OpenID Connect token verification failed',
                error: verification.error
            });
        }

        console.log('OIDC token verified successfully');
        const { payload, claims } = verification;

        // Check if user exists
        let user;
        try {
            user = await User.findOne({ 
                $or: [
                    { email: claims.email },
                    { googleId: claims.subject }
                ]
            });
        } catch (dbError) {
            console.error('Database error while finding user:', dbError);
            return res.status(500).json({
                success: false,
                message: 'Database error while processing authentication'
            });
        }

        if (!user) {
            console.log('Creating new user with Google OAuth');
            // Create new user
            user = new User({
                name: claims.name || 'Unknown User',
                email: claims.email,
                googleId: claims.subject,
                avatar: claims.picture || null,
                isVerified: claims.emailVerified || false,
                authProvider: 'google',
                contactNumber: '', // Initialize with empty string
                country: 'Sri Lanka', // Default country
                oidcClaims: {
                    issuer: claims.issuer || null,
                    subject: claims.subject || null,
                    audience: claims.audience || null,
                    issuedAt: claims.issuedAt ? new Date(claims.issuedAt * 1000) : null,
                    expiration: claims.expiration ? new Date(claims.expiration * 1000) : null
                }
            });
        } else {
            console.log('Updating existing user with Google OAuth');
            // Update existing user
            user.name = claims.name || user.name;
            user.googleId = claims.subject;
            user.avatar = claims.picture || user.avatar;
            user.isVerified = claims.emailVerified || user.isVerified;
            user.authProvider = 'google';
            user.lastLogin = new Date();
            // Ensure required fields exist
            if (!user.contactNumber) user.contactNumber = '';
            if (!user.country) user.country = 'Sri Lanka';
            user.oidcClaims = {
                issuer: claims.issuer || null,
                subject: claims.subject || null,
                audience: claims.audience || null,
                issuedAt: claims.issuedAt ? new Date(claims.issuedAt * 1000) : null,
                expiration: claims.expiration ? new Date(claims.expiration * 1000) : null
            };
        }

        try {
            await user.save();
            console.log('User saved successfully');
        } catch (saveError) {
            console.error('Database error while saving user:', saveError);
            return res.status(500).json({
                success: false,
                message: 'Database error while saving user data'
            });
        }

        // Generate application token
        const token = generateAppToken(user, claims);
        console.log('Application token generated');

        res.json({
            success: true,
            token,
            userId: user._id,
            message: 'OpenID Connect authentication successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('OpenID Connect authentication error:', error);
        res.status(400).json({
            success: false,
            message: 'OpenID Connect authentication failed',
            error: error.message
        });
    }
});

// Facebook OAuth routes
router.post('/facebook', async (req, res) => {
    try {
        console.log('Facebook OAuth request received:', { body: req.body, headers: req.headers });
        
        const { accessToken } = req.body;

        if (!accessToken) {
            console.error('No access token provided in request');
            return res.status(400).json({
                success: false,
                message: 'Access token is required'
            });
        }

        console.log('Verifying Facebook access token...');
        
        // Verify the access token
        const tokenInfo = await facebookOAuth.verifyAccessToken(accessToken);
        if (!tokenInfo.is_valid) {
            console.error('Facebook access token verification failed');
            return res.status(400).json({
                success: false,
                message: 'Invalid Facebook access token'
            });
        }

        console.log('Facebook access token verified successfully');
        
        // Get user information from Facebook
        const userInfo = await facebookOAuth.getUserInfo(accessToken);
        console.log('Facebook user info received:', userInfo);

        // Check if user exists
        let user;
        try {
            user = await User.findOne({ 
                $or: [
                    { email: userInfo.email },
                    { facebookId: userInfo.id }
                ]
            });
        } catch (dbError) {
            console.error('Database error while finding user:', dbError);
            return res.status(500).json({
                success: false,
                message: 'Database error while processing authentication'
            });
        }

        if (!user) {
            console.log('Creating new user with Facebook OAuth');
            // Create new user
            user = new User({
                name: userInfo.name || 'Unknown User',
                email: userInfo.email,
                facebookId: userInfo.id,
                avatar: userInfo.picture?.data?.url || null,
                isVerified: true, // Facebook users are considered verified
                authProvider: 'facebook',
                contactNumber: '', // Initialize with empty string
                country: 'Sri Lanka', // Default country
                lastLogin: new Date()
            });
        } else {
            console.log('Updating existing user with Facebook OAuth');
            // Update existing user
            user.name = userInfo.name || user.name;
            user.facebookId = userInfo.id;
            user.avatar = userInfo.picture?.data?.url || user.avatar;
            user.isVerified = true;
            user.authProvider = 'facebook';
            user.lastLogin = new Date();
            // Ensure required fields exist
            if (!user.contactNumber) user.contactNumber = '';
            if (!user.country) user.country = 'Sri Lanka';
        }

        try {
            await user.save();
            console.log('User saved successfully');
        } catch (saveError) {
            console.error('Database error while saving user:', saveError);
            return res.status(500).json({
                success: false,
                message: 'Database error while saving user data'
            });
        }

        // Generate application token
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Application token generated');

        res.json({
            success: true,
            token,
            userId: user._id,
            message: 'Facebook OAuth authentication successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('Facebook OAuth authentication error:', error);
        res.status(400).json({
            success: false,
            message: 'Facebook OAuth authentication failed',
            error: error.message
        });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

module.exports = router;
