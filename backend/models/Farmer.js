const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    farmName: { type: String, required: true },
    farmSize: { type: String, required: true },
    farmType: { type: String, required: true },
    location: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true },
    experience: { type: String, required: true },
    primaryCrops: { type: [String], required: true },
    language: { type: String, default: 'english' },
    agreeToTerms: { type: Boolean, required: true },
    subscribeNewsletter: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Add index for frequently queried fields
farmerSchema.index({ email: 1 });
farmerSchema.index({ province: 1 });
farmerSchema.index({ farmType: 1 });

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
