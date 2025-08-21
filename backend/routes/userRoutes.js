const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, mobile, location, farmingType, language } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password,
            mobile,
            location,
            farmingType,
            language
        });

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message // Include the actual error message
        });
    }
});

module.exports = router;
