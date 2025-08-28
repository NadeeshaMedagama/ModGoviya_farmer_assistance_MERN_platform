const mongoose = require('mongoose');

const TrialSignupSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true, match: [/\S+@\S+\.\S+/, 'Invalid email'] },
    phone: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    farmLocation: { type: String, required: true, trim: true },
    farmSize: { type: String, required: true, trim: true },
    primaryCrops: { type: String, required: true, trim: true },
    experience: { type: String, required: false, trim: true },
    agreeToTerms: { type: Boolean, required: true },
    newsletter: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

TrialSignupSchema.index({ email: 1, createdAt: -1 });

module.exports = mongoose.model('TrialSignup', TrialSignupSchema);


