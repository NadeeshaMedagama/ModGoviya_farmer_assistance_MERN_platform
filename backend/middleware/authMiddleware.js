const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Optional authentication middleware (for routes that can work with or without auth)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Check if token exists and is not empty
            if (!token || token === 'null' || token === 'undefined') {
                // No valid token provided, but this is not an error for optional routes
                req.user = null;
                return next();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                // User not found, but this is not an error for optional routes
                req.user = null;
                return next();
            }

            console.log('Authenticated user:', req.user);
            next();
            return;
        } catch (error) {
            console.error('Token verification error:', error.message);
            // Token verification failed, but this is not an error for optional routes
            req.user = null;
            return next();
        }
    }

    // No token provided, but this is not an error for optional routes
    req.user = null;
    next();
});

// Required authentication middleware (for routes that require auth)
const requireAuth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Check if token exists and is not empty
            if (!token || token === 'null' || token === 'undefined') {
                res.status(401);
                throw new Error('Not authorized, no valid token');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            console.log('Authenticated user:', req.user);
            next();
            return;
        } catch (error) {
            console.error('Token verification error:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
    }
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized' });
    }
};

module.exports = { protect, requireAuth, admin, auth }; // Export all middlewares
