const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Subscribe endpoint
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        // Create new subscriber
        const subscriber = new Subscriber({ email });
        await subscriber.save();

        // Send confirmation email
        const mailOptions = {
            from: '"ModGoviya" <noreply@modgoviya.lk>',
            to: email,
            subject: 'Subscription Confirmation',
            text: `Thank you for subscribing to ModGoviya!\n\nYou'll now receive updates on farming tips, weather forecasts, and market insights.\n\nBest regards,\nModGoviya Team`,
            html: `<p>Thank you for subscribing to ModGoviya!</p>
             <p>You'll now receive updates on farming tips, weather forecasts, and market insights.</p>
             <p>Best regards,<br>ModGoviya Team</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ message: 'Subscription Successful', error: error.message });
    }
});

module.exports = router;
