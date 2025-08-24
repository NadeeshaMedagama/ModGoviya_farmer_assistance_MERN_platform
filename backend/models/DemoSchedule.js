const mongoose = require('mongoose');

const demoScheduleSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
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
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    jobTitle: {
        type: String,
        trim: true
    },
    employees: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    timezone: {
        type: String,
        default: 'UTC-5 (EST)'
    },
    demoType: {
        type: String,
        required: true,
        enum: ['live', 'group', 'custom'],
        default: 'live'
    },
    interests: [{
        type: String,
        trim: true
    }],
    message: {
        type: String,
        trim: true
    },
    selectedDate: {
        type: Date,
        required: true
    },
    selectedTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    scheduledAt: {
        type: Date,
        default: Date.now
    },
    confirmedAt: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
demoScheduleSchema.index({ email: 1, status: 1 });
demoScheduleSchema.index({ selectedDate: 1, selectedTime: 1 });
demoScheduleSchema.index({ status: 1 });

module.exports = mongoose.model('DemoSchedule', demoScheduleSchema);
