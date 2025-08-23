const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc    Register a new user (farmer, trader, or buyer)
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { 
        fullName, 
        firstName, 
        lastName,
        email, 
        password, 
        mobile, 
        phone,
        location, 
        district,
        province,
        address,
        city,
        postalCode,
        farmingType, 
        farmName,
        farmSize,
        farmType,
        experience,
        primaryCrops,
        businessName,
        businessType,
        country,
        language,
        userType,
        agreeToTerms
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    // Validate required fields
    if (!email || !password || !fullName) {
        res.status(400);
        throw new Error('Please provide email, password, and full name');
    }

    // Validate terms agreement
    if (!agreeToTerms) {
        res.status(400);
        throw new Error('You must agree to the terms and conditions');
    }

    // Create user object with provided fields
    const userData = {
        email,
        password,
        fullName,
        authProvider: 'local',
        userType: userType || 'farmer',
        role: userType || 'farmer'
    };

    // Add optional fields if provided
    if (firstName) userData.firstName = firstName;
    if (lastName) userData.lastName = lastName;
    if (mobile) userData.mobile = mobile;
    if (phone) userData.phone = phone;
    if (location) userData.location = location;
    if (district) userData.district = district;
    if (province) userData.province = province;
    if (address) userData.address = address;
    if (city) userData.city = city;
    if (postalCode) userData.postalCode = postalCode;
    if (country) userData.country = country;
    if (language) userData.language = language;

    // Add farmer-specific fields
    if (farmingType) userData.farmingType = farmingType;
    if (farmName) userData.farmName = farmName;
    if (farmSize) userData.farmSize = farmSize;
    if (farmType) userData.farmType = farmType;
    if (experience) userData.experience = experience;
    if (primaryCrops) userData.primaryCrops = primaryCrops;

    // Add trader-specific fields
    if (businessName) userData.businessName = businessName;
    if (businessType) userData.businessType = businessType;

    try {
        // Create user (password will be hashed by pre-save hook)
        const user = await User.create(userData);

        if (user) {
            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
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
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400);
            throw new Error(error.message);
        }
        throw error;
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Check if account is locked
    if (user.isLocked) {
        res.status(423);
        throw new Error('Account is locked due to multiple failed login attempts. Please try again later.');
    }

    // Check if account is active
    if (!user.isActive) {
        res.status(423);
        throw new Error('Account is deactivated. Please contact support.');
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        // Increment login attempts
        await user.incLoginAttempts();
        
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
        await user.resetLoginAttempts();
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({
        success: true,
        message: 'Login successful',
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
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (user) {
        res.json({
            success: true,
            data: user
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId);
    
    if (user) {
        // Update allowed fields
        const allowedUpdates = [
            'fullName', 'firstName', 'lastName', 'mobile', 'phone',
            'location', 'district', 'province', 'address', 'city',
            'postalCode', 'country', 'farmingType', 'farmName',
            'farmSize', 'farmType', 'experience', 'primaryCrops',
            'businessName', 'businessType', 'language'
        ];

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        const updatedUser = await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                userType: updatedUser.userType,
                role: updatedUser.role,
                isVerified: updatedUser.isVerified,
                language: updatedUser.language
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error('Please provide current and new password');
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        res.status(401);
        throw new Error('Current password is incorrect');
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    res.json({
        success: true,
        message: 'Password changed successfully'
    });
});

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword
};
