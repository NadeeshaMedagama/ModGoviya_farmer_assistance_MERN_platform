const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TraderSchema = new mongoose.Schema({
    // Personal Info
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    phone: { type: String, required: true, trim: true },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },

    // Account Type
    userType: {
        type: String,
        required: true,
        enum: ['farmer', 'supplier', 'buyer']
    },

    // Location
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    province: {
        type: String,
        required: true,
        enum: [
            'Western Province',
            'Central Province',
            'Southern Province',
            'North Western Province',
            'North Central Province',
            'Uva Province',
            'Sabaragamuwa Province',
            'Northern Province',
            'Eastern Province'
        ]
    },
    postalCode: { type: String, trim: true },

    // Business Info
    businessName: { type: String, trim: true },
    businessType: {
        type: String,
        enum: ['individual', 'partnership', 'corporation', 'cooperative']
    },
    businessDescription: { type: String, trim: true },
    experience: {
        type: String,
        enum: ['0-1', '1-3', '3-5', '5-10', '10+']
    },
    specialization: {
        type: [String],
        enum: [
            'Rice Farming', 'Vegetable Farming', 'Fruit Cultivation', 'Spice Cultivation',
            'Tea Cultivation', 'Coconut Farming', 'Dairy Farming', 'Poultry Farming',
            'Fish Farming', 'Organic Farming', 'Equipment Trading', 'Seed Supply',
            'Fertilizer Supply', 'Agricultural Services'
        ]
    },

    // Documents
    nationalId: { type: String }, // Path to stored file
    businessLicense: { type: String }, // Path to stored file
    profilePhoto: { type: String }, // Path to stored file

    // Terms
    agreeToTerms: { type: Boolean, required: true },
    agreeToMarketing: { type: Boolean, default: false },

    // Status
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'active', 'suspended']
    },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
TraderSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
TraderSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Trader', TraderSchema);
