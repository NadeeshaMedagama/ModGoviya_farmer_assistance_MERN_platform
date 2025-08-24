const express = require('express');
const { body, validationResult } = require('express-validator');
const {
    scheduleDemo,
    getAllDemos,
    getDemoById,
    updateDemoStatus,
    getDemosByEmail,
    cancelDemo
} = require('../controllers/demoController');
const { requireAuth, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation for demo scheduling
const scheduleDemoValidation = [
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('company')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Company name must be between 2 and 100 characters'),
    body('selectedDate')
        .isISO8601()
        .withMessage('Please provide a valid date'),
    body('selectedTime')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Please select a time slot'),
    body('demoType')
        .isIn(['live', 'group', 'custom'])
        .withMessage('Please select a valid demo type'),
    body('phone')
        .optional()
        .trim()
        .isLength({ min: 10, max: 20 })
        .withMessage('Phone number must be between 10 and 20 characters'),
    body('jobTitle')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Job title must be less than 100 characters'),
    body('message')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Message must be less than 1000 characters')
];

// @route   POST /api/demo/schedule
// @desc    Schedule a new demo
// @access  Public
router.post('/schedule', scheduleDemoValidation, async (req, res) => {
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

        await scheduleDemo(req, res);
    } catch (error) {
        console.error('Demo scheduling error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during demo scheduling'
        });
    }
});

// @route   GET /api/demo/all
// @desc    Get all demo schedules (admin only)
// @access  Private/Admin
router.get('/all', requireAuth, admin, getAllDemos);

// @route   GET /api/demo/:id
// @desc    Get demo by ID
// @access  Private
router.get('/:id', requireAuth, getDemoById);

// @route   PUT /api/demo/:id/status
// @desc    Update demo status (admin only)
// @access  Private/Admin
router.put('/:id/status', requireAuth, admin, updateDemoStatus);

// @route   GET /api/demo/user/:email
// @desc    Get demos by email
// @access  Public
router.get('/user/:email', getDemosByEmail);

// @route   PUT /api/demo/:id/cancel
// @desc    Cancel demo
// @access  Public
router.put('/:id/cancel', cancelDemo);

module.exports = router;
