const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    // Basic user information
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
    firstName: {
        type: String,
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required for local authentication'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password cannot exceed 128 characters']
    },
    mobile: {
        type: String,
        trim: true,
        maxlength: [15, 'Mobile number cannot exceed 15 characters']
    },
    phone: {
        type: String,
        trim: true,
        maxlength: [15, 'Phone number cannot exceed 15 characters']
    },
    location: {
        type: String,
        trim: true,
        maxlength: [100, 'Location cannot exceed 100 characters']
    },
    district: {
        type: String,
        trim: true,
        maxlength: [50, 'District cannot exceed 50 characters']
    },
    province: {
        type: String,
        trim: true,
        maxlength: [50, 'Province cannot exceed 50 characters']
    },
    address: {
        type: String,
        trim: true,
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    city: {
        type: String,
        trim: true,
        maxlength: [50, 'City cannot exceed 50 characters']
    },
    postalCode: {
        type: String,
        trim: true,
        maxlength: [10, 'Postal code cannot exceed 10 characters']
    },
    country: {
        type: String,
        trim: true,
        maxlength: [50, 'Country cannot exceed 50 characters']
    },
    
    // User type and role
    userType: {
        type: String,
        enum: ['farmer', 'trader', 'buyer', 'admin'],
        default: 'farmer'
    },
    role: {
        type: String,
        enum: ['farmer', 'trader', 'buyer', 'admin'],
        default: 'farmer'
    },
    
    // Farmer-specific fields
    farmingType: {
        type: String,
        trim: true,
        maxlength: [100, 'Farming type cannot exceed 100 characters']
    },
    farmName: {
        type: String,
        trim: true,
        maxlength: [100, 'Farm name cannot exceed 100 characters']
    },
    farmSize: {
        type: String,
        trim: true,
        maxlength: [50, 'Farm size cannot exceed 50 characters']
    },
    farmType: {
        type: String,
        trim: true,
        maxlength: [100, 'Farm type cannot exceed 100 characters']
    },
    experience: {
        type: String,
        trim: true,
        maxlength: [50, 'Experience cannot exceed 50 characters']
    },
    primaryCrops: {
        type: String,
        trim: true,
        maxlength: [200, 'Primary crops cannot exceed 200 characters']
    },
    
    // Trader-specific fields
    businessName: {
        type: String,
        trim: true,
        maxlength: [100, 'Business name cannot exceed 100 characters']
    },
    businessType: {
        type: String,
        trim: true,
        maxlength: [100, 'Business type cannot exceed 100 characters']
    },
    
    // Authentication and verification
    authProvider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    
    // Security features
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    },
    
    // Preferences
    language: {
        type: String,
        enum: ['English', 'Sinhala', 'Tamil'],
        default: 'English'
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

// Index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ userType: 1 });
UserSchema.index({ isActive: 1 });

// Virtual for checking if account is locked
UserSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware for password hashing
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    if (!this.password || (this.authProvider !== 'local' && !this.password)) {
        return next();
    }
    
    try {
        // Password strength validation
        if (this.authProvider === 'local') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(this.password)) {
                this.invalidate('password', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                return next();
            }
        }
        
        // Hash password with bcrypt
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false;
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
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
    }
    
    return this.updateOne(updates);
};

// Method to reset login attempts
UserSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 }
    });
};

module.exports = mongoose.model('User', UserSchema);
