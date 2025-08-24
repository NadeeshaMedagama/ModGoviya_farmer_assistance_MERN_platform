require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const subscribeRouter = require('./routes/subscribe');

// Security middleware imports
const {
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
} = require('./middleware/securityMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Security middleware
app.use(securityHeaders);
app.use(xssProtection);
app.use(hppProtection);
app.use(mongoSanitization);
app.use(cors(corsOptions));
app.use(validateInput);
app.use(sqlInjectionProtection);
app.use(validateContentType);
app.use(requestSizeLimit);
app.use(securityLogging);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);
app.use('/api/contact/', contactLimiter);

// Routes
app.use('/api/subscribe', subscribeRouter);

// Consolidated authentication routes (handles all user types)
app.use('/api/auth', require('./routes/auth'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

// Start server
if (process.env.NODE_ENV === 'production' && process.env.SSL_KEY && process.env.SSL_CERT) {
    // HTTPS server for production
    const httpsOptions = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT)
    };
    
    https.createServer(httpsOptions, app).listen(PORT, () => {
        console.log(`HTTPS Server running on port ${PORT}`);
    });
} else {
    // HTTP server for development
    app.listen(PORT, () => {
        console.log(`HTTP Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`MongoDB: ${process.env.MONGODB_URI ? 'Connected' : 'Not configured'}`);
    });
}

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});
