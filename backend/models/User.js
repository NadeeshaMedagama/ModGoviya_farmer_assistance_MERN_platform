const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    fullName: {
        type: String,
        trim: true,
        maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        maxlength: [255, 'Email cannot exceed 255 characters']
    },
    password: {
        type: String,
        maxlength: [128, 'Password cannot exceed 128 characters']
        // minlength validation is handled in pre-save hook for local auth only
    },
    contactNumber: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please use a valid phone number']
    },
    country: {
        type: String,
        trim: true,
        default: 'Sri Lanka'
    },
    googleId: {
        type: String,
        sparse: true // Allows multiple null values
    },
    facebookId: {
        type: String,
        sparse: true // Allows multiple null values
    },
    avatar: {
        type: String, // Profile picture URL from Google or Facebook
        maxlength: [500, 'Avatar URL cannot exceed 500 characters']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please use a valid phone number']
    },
    location: {
        type: String,
        enum: [
            'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura',
            'Polonnaruwa', 'Kurunegala', 'Ratnapura', 'Badulla', 'Matara',
            'Hambantota', 'Trincomalee', 'Batticaloa', 'Ampara'
        ]
    },
    farmingType: {
        type: String,
        enum: [
            'Vegetables', 'Rice', 'Mixed Farming', 'Livestock', 'Fruits',
            'Spices', 'Tea', 'Coconut', 'Rubber', 'Floriculture'
        ]
    },
    language: {
        type: String,
        enum: ['Sinhala', 'Tamil', 'English'],
        default: 'English'
    },
    role: {
        type: String,
        enum: ['farmer', 'admin', 'extension_officer'],
        default: 'farmer'
    },
    authProvider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    lastLogin: {
        type: Date
    },
    oidcClaims: {
        issuer: String,
        subject: String,
        audience: String,
        issuedAt: Date,
        expiration: Date,
        locale: String,
        emailVerified: Boolean,
        tokenIssuedAt: Date,
        tokenExpiresAt: Date,
        authorizedParty: String,
        hostedDomain: String
    },
    // Security fields
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpires: {
        type: Date
    },
    // Account status
    isActive: {
        type: Boolean,
        default: true
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes for better performance and security
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });
UserSchema.index({ facebookId: 1 }, { unique: true, sparse: true });
UserSchema.index({ 'oidcClaims.issuer': 1, 'oidcClaims.subject': 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ lastLogin: -1 });

// Virtual for checking if account is locked
UserSchema.virtual('isAccountLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Conditional validation for password (only required for local auth)
UserSchema.pre('validate', function(next) {
    if (this.authProvider === 'local' && !this.password) {
        this.invalidate('password', 'Password is required for local authentication');
    }
    next();
});

// Hash password before saving (only for local auth)
UserSchema.pre('save', async function(next) {
    // Skip password hashing for OAuth users or if password is not modified
    if (!this.isModified('password') || !this.password || this.authProvider === 'google' || this.authProvider === 'facebook') {
        return next();
    }

    try {
        // Check password strength for local auth only
        if (this.authProvider === 'local') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(this.password)) {
                this.invalidate('password', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                return next();
            }
        }

        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false; // OAuth users don't have passwords
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to increment login attempts
UserSchema.methods.incLoginAttempts = function() {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: { loginAttempts: 1 }
        });
    }
    
    const updates = { $inc: { loginAttempts: 1 } };
    
    // Lock account after 5 failed attempts for 2 hours
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { 
            lockUntil: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            isLocked: true
        };
    }
    
    return this.updateOne(updates);
};

// Method to reset login attempts
UserSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 },
        $set: { isLocked: false }
    });
};

// Method to verify OpenID Connect token claims
UserSchema.methods.verifyOIDCClaims = function(claims) {
    if (!this.oidcClaims) return false;
    
    return (
        this.oidcClaims.issuer === claims.iss &&
        this.oidcClaims.subject === claims.sub &&
        this.oidcClaims.audience === claims.aud
    );
};

// Method to generate password reset token
UserSchema.methods.generatePasswordResetToken = function() {
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    return resetToken;
};

// Method to generate email verification token
UserSchema.methods.generateEmailVerificationToken = function() {
    const crypto = require('crypto');
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    this.emailVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');
    
    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    return verificationToken;
};

module.exports = mongoose.model('User', UserSchema);
