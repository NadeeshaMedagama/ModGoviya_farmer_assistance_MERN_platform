const express = require('express');
const router = express.Router();
const Trader = require('../models/Trader');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Handle file uploads
const fileUpload = upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'nationalId', maxCount: 1 },
    { name: 'businessLicense', maxCount: 1 }
]);

router.post('/register', fileUpload, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            userType,
            address,
            city,
            province,
            postalCode,
            businessName,
            businessType,
            businessDescription,
            experience,
            specialization,
            agreeToTerms,
            agreeToMarketing
        } = req.body;

        // Check if user already exists
        const existingUser = await Trader.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new Trader({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            userType,
            address,
            city,
            province,
            postalCode,
            agreeToTerms,
            agreeToMarketing,
            status: 'pending',
            isVerified: false
        });

        // Add business info if not a buyer
        if (userType !== 'buyer') {
            newUser.businessName = businessName;
            newUser.businessType = businessType;
            newUser.businessDescription = businessDescription;
            newUser.experience = experience;
            newUser.specialization = Array.isArray(specialization)
                ? specialization
                : [specialization].filter(Boolean);
        }

        // Handle file uploads
        if (req.files) {
            if (req.files['profilePhoto']) {
                newUser.profilePhoto = req.files['profilePhoto'][0].path;
            }
            if (req.files['nationalId']) {
                newUser.nationalId = req.files['nationalId'][0].path;
            }
            if (req.files['businessLicense'] && userType !== 'buyer') {
                newUser.businessLicense = req.files['businessLicense'][0].path;
            }
        }

        await newUser.save();

        // In a real app, you would send a verification email here

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please check your email for verification instructions.',
            userId: newUser._id
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.',
            error: error.message
        });
    }
});

module.exports = router;
