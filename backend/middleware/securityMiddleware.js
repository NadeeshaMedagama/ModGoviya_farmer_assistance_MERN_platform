const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const validator = require('validator');

// Rate limiting configuration
const createRateLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs: windowMs,
        max: max,
        message: {
            error: 'Too many requests',
            message: message || 'Too many requests from this IP, please try again later.'
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};

// General rate limiter
const generalLimiter = createRateLimiter(15 * 60 * 1000, 100, 'Too many requests from this IP');

// Auth rate limiter (more restrictive)
const authLimiter = createRateLimiter(15 * 60 * 1000, 20, 'Too many authentication attempts, please try again later');

// Contact form rate limiter
const contactLimiter = createRateLimiter(60 * 60 * 1000, 3, 'Too many contact form submissions, please try again later');

// Security headers middleware
const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://accounts.google.com"],
            connectSrc: ["'self'", "https://accounts.google.com"],
            frameSrc: ["'self'", "https://accounts.google.com"],
        },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
});

// XSS protection middleware (custom implementation since xss-clean is deprecated)
const xssProtection = (req, res, next) => {
    const sanitizeData = (data) => {
        if (typeof data === 'string') {
            // Remove potentially dangerous characters and scripts
            return data
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '')
                .replace(/<[^>]*>/g, '');
        }
        if (typeof data === 'object' && data !== null) {
            const sanitized = {};
            for (const [key, value] of Object.entries(data)) {
                sanitized[key] = sanitizeData(value);
            }
            return sanitized;
        }
        return data;
    };

    // Sanitize body
    if (req.body) {
        req.body = sanitizeData(req.body);
    }

    // Sanitize query parameters
    if (req.query) {
        req.query = sanitizeData(req.query);
    }

    // Sanitize params
    if (req.params) {
        req.params = sanitizeData(req.params);
    }

    next();
};

// HTTP Parameter Pollution protection
const hppProtection = hpp();

// MongoDB injection protection
const mongoSanitization = mongoSanitize();

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
            .split(',')
            .map(o => o.trim());
        
        // Allow requests with no origin (like mobile apps, curl, Google OAuth)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) return callback(null, true);
        
        // In development, allow common dev ports and Google OAuth
        if (process.env.NODE_ENV !== 'production') {
            const devOrigins = [
                'http://localhost:5173', 
                'http://127.0.0.1:5173',
                'http://localhost:3000',
                'http://127.0.0.1:3000',
                'https://accounts.google.com'
            ];
            if (devOrigins.includes(origin)) {
                return callback(null, true);
            }
        }
        
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count']
};

// Input validation middleware
const validateInput = (req, res, next) => {
    const sanitizeData = (data) => {
        if (typeof data === 'string') {
            return validator.escape(validator.trim(data));
        }
        if (typeof data === 'object' && data !== null) {
            const sanitized = {};
            for (const [key, value] of Object.entries(data)) {
                sanitized[key] = sanitizeData(value);
            }
            return sanitized;
        }
        return data;
    };

    // Sanitize body
    if (req.body) {
        req.body = sanitizeData(req.body);
    }

    // Sanitize query parameters
    if (req.query) {
        req.query = sanitizeData(req.query);
    }

    // Sanitize params
    if (req.params) {
        req.params = sanitizeData(req.params);
    }

    next();
};

// SQL injection protection (for MongoDB, but good practice)
const sqlInjectionProtection = (req, res, next) => {
    const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|JAVASCRIPT|ONLOAD|ONERROR|ONCLICK)\b)/i;
    
    const checkForSQLInjection = (obj) => {
        // Handle null/undefined objects
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string' && sqlInjectionPattern.test(value)) {
                return true;
            }
            if (typeof value === 'object' && value !== null) {
                if (checkForSQLInjection(value)) {
                    return true;
                }
            }
        }
        return false;
    };

    if (checkForSQLInjection(req.body) || checkForSQLInjection(req.query) || checkForSQLInjection(req.params)) {
        return res.status(400).json({
            error: 'Invalid input detected',
            message: 'Potentially malicious input detected'
        });
    }

    next();
};

// Content type validation
const validateContentType = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(400).json({
                error: 'Invalid content type',
                message: 'Content-Type must be application/json'
            });
        }
    }
    next();
};

// Request size limiting
const requestSizeLimit = (req, res, next) => {
    const contentLength = parseInt(req.headers['content-length'] || '0');
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (contentLength > maxSize) {
        return res.status(413).json({
            error: 'Request too large',
            message: 'Request body too large'
        });
    }
    next();
};

// Security logging middleware
const securityLogging = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.get('User-Agent'),
            ip: req.ip || req.connection.remoteAddress,
            userId: req.user ? req.user._id : 'anonymous'
        };

        // Log security-relevant events
        if (res.statusCode >= 400) {
            console.warn('Security Event:', logData);
        } else {
            console.log('Request:', logData);
        }
    });

    next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Don't leak error details in production
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong'
        });
    }

    res.status(500).json({
        error: err.message,
        stack: err.stack
    });
};

module.exports = {
    generalLimiter,
    authLimiter,
    contactLimiter,
    securityHeaders,
    xssProtection,
    hppProtection,
    mongoSanitization,
    corsOptions,
    validateInput,
    sqlInjectionProtection,
    validateContentType,
    requestSizeLimit,
    securityLogging,
    errorHandler
}; 