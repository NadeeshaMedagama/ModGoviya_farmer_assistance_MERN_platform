const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const TrialSignup = require('../models/TrialSignup');

router.post('/', [
    body('firstName').trim().isLength({ min: 2, max: 100 }),
    body('lastName').trim().isLength({ min: 2, max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().isLength({ min: 6, max: 30 }),
    body('password').isLength({ min: 6 }),
    body('farmLocation').trim().notEmpty(),
    body('farmSize').trim().notEmpty(),
    body('primaryCrops').trim().notEmpty(),
    body('agreeToTerms').isBoolean(),
    body('newsletter').optional().isBoolean()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { password, ...rest } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const record = new TrialSignup({ ...rest, passwordHash });
        await record.save();

        return res.status(201).json({ success: true, message: 'Trial signup saved' });
    } catch (err) {
        console.error('Trial signup error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;


