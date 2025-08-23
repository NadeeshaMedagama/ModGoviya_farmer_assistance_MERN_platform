const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route   POST api/farmers/register
// @desc    Register a new farmer
// @access  Public
router.post('/register', [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('farmName', 'Farm name is required').not().isEmpty(),
    check('farmType', 'Farm type is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    check('province', 'Province is required').not().isEmpty(),
    check('experience', 'Experience level is required').not().isEmpty(),
    check('primaryCrops', 'At least one crop must be selected').not().isEmpty(),
    check('agreeToTerms', 'You must agree to the terms and conditions').isBoolean().equals('true')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        farmName,
        farmSize,
        farmType,
        location,
        district,
        province,
        experience,
        primaryCrops,
        language,
        subscribeNewsletter
    } = req.body;

    try {
        // Check if farmer already exists
        let farmer = await Farmer.findOne({ email });
        if (farmer) {
            return res.status(400).json({ errors: [{ msg: 'Farmer already exists' }] });
        }

        // Create new farmer instance
        farmer = new Farmer({
            firstName,
            lastName,
            email,
            phone,
            password,
            farmName,
            farmSize,
            farmType,
            location,
            district,
            province,
            experience,
            primaryCrops,
            language,
            agreeToTerms: true,
            subscribeNewsletter
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        farmer.password = await bcrypt.hash(password, salt);

        // Save farmer to database
        await farmer.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Farmer registered successfully',
            farmer: {
                id: farmer._id,
                firstName: farmer.firstName,
                lastName: farmer.lastName,
                email: farmer.email,
                farmName: farmer.farmName
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
