const mongoose = require('mongoose');

const ContactSubmissionSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters'],
        maxlength: [100, 'Full name cannot exceed 100 characters'],
        match: [/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    phone: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please use a valid phone number']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        minlength: [5, 'Subject must be at least 5 characters'],
        maxlength: [200, 'Subject cannot exceed 200 characters'],
        match: [/^[a-zA-Z0-9\s\-_.,!?]+$/, 'Subject contains invalid characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [2000, 'Message cannot exceed 2000 characters'],
        match: [/^[a-zA-Z0-9\s\-_.,!?@#$%^&*()+=<>[\]{}|\\/`~"':;]+$/, 'Message contains invalid characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 365 * 24 * 60 * 60 // Auto-delete after 1 year
    },
    ipAddress: {
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: false
    }
});

// Index for better query performance
ContactSubmissionSchema.index({ email: 1, createdAt: -1 });
ContactSubmissionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema); 