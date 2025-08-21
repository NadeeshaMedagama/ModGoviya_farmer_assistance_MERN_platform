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

/* ─── Security Middleware ────────────────────────── */
// Security headers
app.use(securityHeaders);

// CORS configuration
app.use(cors(corsOptions));

// Rate limiting
app.use(generalLimiter);

// XSS protection
app.use(xssProtection);

// HTTP Parameter Pollution protection
app.use(hppProtection);

// MongoDB injection protection
app.use(mongoSanitization);

// Input validation and sanitization
app.use(validateInput);

// SQL injection protection
app.use(sqlInjectionProtection);

// Content type validation
app.use(validateContentType);

// Request size limiting
app.use(requestSizeLimit);

// Security logging
app.use(securityLogging);

// Session middleware (for cart functionality)
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ─── API routes with rate limiting ─────────────── */
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        googleClientId: process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not Configured'
    });
});

// Auth routes with stricter rate limiting (without content type validation for OAuth)
app.use('/api/auth', authLimiter, require('./routes/auth'));

// Contact form with specific rate limiting
app.use('/api/contact', contactLimiter, require('./routes/contact'));

// Other routes with content type validation
app.use('/api/users', validateContentType, require('./routes/userRoutes'));
app.use('/api/weather', validateContentType, require('./routes/weather'));
app.use('/api/subscribe', validateContentType, subscribeRouter);
app.use('/api/products', validateContentType, require('./routes/productRoutes'));
app.use('/api/cart', validateContentType, require('./routes/cart'));
app.use('/api/orders', validateContentType, require('./routes/orderRoutes'));
app.use('/api/register', validateContentType, require('./routes/registration'));
app.use('/api/farmers', validateContentType, require('./routes/farmerRegistration'));

/* ─── Static assets in production ───────────────── */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    );
}

/* ─── Error handler ─────────────────────────────── */
app.use(errorHandler);

/* ─── DB Connection + Server Start ──────────────── */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected');
        const useHttps = process.env.HTTPS_ENABLED === 'true';
        let server;
        if (useHttps) {
            const keyPath = process.env.SSL_KEY_PATH;
            const certPath = process.env.SSL_CERT_PATH;
            if (keyPath && certPath) {
                try {
                    const credentials = {
                        key: fs.readFileSync(keyPath),
                        cert: fs.readFileSync(certPath)
                    };
                    server = https.createServer(credentials, app).listen(PORT, () => {
                        console.log(`HTTPS server running on port ${PORT}`);
                        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
                        console.log('Security measures: ✅ Enabled (HTTPS)');
                    });
                } catch (e) {
                    console.error('Failed to read SSL certificate or key. Falling back to HTTP.', e.message);
                    server = app.listen(PORT, () => {
                        console.log(`Server running on port ${PORT}`);
                        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
                        console.log('Security measures: ✅ Enabled');
                    });
                }
            } else {
                console.warn('HTTPS_ENABLED is true but SSL_KEY_PATH/SSL_CERT_PATH not provided. Falling back to HTTP.');
                server = app.listen(PORT, () => {
                    console.log(`Server running on port ${PORT}`);
                    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
                    console.log('Security measures: ✅ Enabled');
                });
            }
        } else {
            server = app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
                console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
                console.log('Security measures: ✅ Enabled');
            });
        }

        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Please try a different port or stop the existing server.`);
                console.error('You can kill the existing process with: taskkill /f /im node.exe');
                process.exit(1);
            } else {
                console.error('Server error:', error);
                process.exit(1);
            }
        });

        // Handle graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received, shutting down gracefully');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('SIGINT received, shutting down gracefully');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
