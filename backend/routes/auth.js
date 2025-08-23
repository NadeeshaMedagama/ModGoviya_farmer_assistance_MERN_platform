const express = require('express');
const { body, validationResult } = require('express-validator');
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile, 
    changePassword 
} = require('../controllers/authController');
const { verifyOIDCToken, generateAppToken } = require('../config/oidc');
const { facebookOAuth } = require('../config/facebook');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Input validation for login
const loginValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];

// Input validation for registration
const registerValidation = [
    body('fullName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .isLength({ min: 8, max: 128 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('mobile')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid mobile number'),
    body('location')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Location cannot exceed 100 characters'),
    body('farmingType')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Farming type cannot exceed 100 characters'),
    body('language')
        .optional()
        .isIn(['English', 'Sinhala', 'Tamil'])
        .withMessage('Language must be English, Sinhala, or Tamil'),
    body('userType')
        .optional()
        .isIn(['farmer', 'trader', 'buyer'])
        .withMessage('User type must be farmer, trader, or buyer'),
    body('agreeToTerms')
        .isBoolean()
        .withMessage('You must agree to the terms and conditions')
];

// Input validation for profile update
const profileUpdateValidation = [
    body('fullName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters'),
    body('mobile')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid mobile number'),
    body('location')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Location cannot exceed 100 characters'),
    body('farmingType')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Farming type cannot exceed 100 characters'),
    body('language')
        .optional()
        .isIn(['English', 'Sinhala', 'Tamil'])
        .withMessage('Language must be English, Sinhala, or Tamil')
];

// Input validation for password change
const passwordChangeValidation = [
    body('currentPassword')
        .isLength({ min: 8 })
        .withMessage('Current password must be at least 8 characters long'),
    body('newPassword')
        .isLength({ min: 8, max: 128 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Middleware to check validation results
const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, checkValidationResult, registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginValidation, checkValidationResult, loginUser);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', getUserProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', profileUpdateValidation, checkValidationResult, updateUserProfile);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', passwordChangeValidation, checkValidationResult, changePassword);

// @route   POST /api/auth/google
// @desc    Google OAuth authentication
// @access  Public
router.post('/google', async (req, res) => {
    try {
        const { idToken } = req.body;
        
        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: 'Google ID token is required'
            });
        }

        // Verify Google ID token
        const ticket = await verifyOIDCToken(idToken);
        const payload = ticket.getPayload();
        
        // Check if user exists
        let user = await User.findOne({ email: payload.email });
        
        if (!user) {
            // Create new user
            user = await User.create({
                email: payload.email,
                fullName: payload.name,
                firstName: payload.given_name,
                lastName: payload.family_name,
                authProvider: 'google',
                isVerified: payload.email_verified,
                language: 'English',
                userType: 'farmer',
                role: 'farmer'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Google authentication successful',
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                userType: user.userType,
                role: user.role,
                isVerified: user.isVerified,
                language: user.language
            },
            token
        });
    } catch (error) {
        console.error('Google OAuth error:', error);
        res.status(500).json({
            success: false,
            message: 'Google authentication failed'
        });
    }
});

// @route   POST /api/auth/facebook
// @desc    Facebook OAuth authentication
// @access  Public
router.post('/facebook', async (req, res) => {
    try {
        const { accessToken } = req.body;
        
        if (!accessToken) {
            return res.status(400).json({
                success: false,
                message: 'Facebook access token is required'
            });
        }

        // Get Facebook user data
        const userData = await facebookOAuth(accessToken);
        
        // Check if user exists
        let user = await User.findOne({ email: userData.email });
        
        if (!user) {
            // Create new user
            user = await User.create({
                email: userData.email,
                fullName: userData.name,
                firstName: userData.first_name,
                lastName: userData.last_name,
                authProvider: 'facebook',
                isVerified: true,
                language: 'English',
                userType: 'farmer',
                role: 'farmer'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Facebook authentication successful',
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                userType: user.userType,
                role: user.role,
                isVerified: user.isVerified,
                language: user.language
            },
            token
        });
    } catch (error) {
        console.error('Facebook OAuth error:', error);
        res.status(500).json({
            success: false,
            message: 'Facebook authentication failed'
        });
    }
});

module.exports = router;
