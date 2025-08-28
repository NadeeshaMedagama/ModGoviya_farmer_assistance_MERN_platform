const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    expertId: {
        type: String,
        required: true,
        trim: true
    },
    expertName: {
        type: String,
        required: true,
        trim: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['video-call', 'phone-call', 'field-visit', 'report-analysis']
    },
    selectedDate: {
        type: Date,
        required: true
    },
    selectedTime: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    farmSize: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    cropType: {
        type: String,
        trim: true
    },
    issue: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

consultationSchema.index({ email: 1, selectedDate: 1, selectedTime: 1 });

module.exports = mongoose.model('Consultation', consultationSchema);


