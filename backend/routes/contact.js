const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ContactSubmission = require('../models/ContactSubmission');

// Contact form submission endpoint with validation
router.post('/', [
    body('fullName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid phone number'),
    
    body('subject')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Subject must be between 5 and 200 characters')
        .matches(/^[a-zA-Z0-9\s\-_.,!?]+$/)
        .withMessage('Subject contains invalid characters'),
    
    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters')
        .matches(/^[a-zA-Z0-9\s\-_.,!?@#$%^&*()+=<>[\]{}|\\/`~"':;]+$/)
        .withMessage('Message contains invalid characters')
], async (req, res) => {
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

        const { fullName, email, phone, subject, message } = req.body;

        // Create new contact submission
        const newSubmission = new ContactSubmission({
            fullName,
            email,
            phone,
            subject,
            message
        });

        await newSubmission.save();

        res.status(201).json({
            success: true,
            message: 'Thank you! Your message has been submitted successfully.'
        });
    } catch (error) {
        console.error('Error saving contact submission:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while submitting your message. Please try again later.'
        });
    }
});

module.exports = router; 