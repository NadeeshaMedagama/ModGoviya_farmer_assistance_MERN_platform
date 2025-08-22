const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    type: {
        type: String,
        enum: ['article', 'video', 'document', 'guide'],
        required: true
    },
    category: {
        type: String,
        enum: ['crops', 'livestock', 'soil', 'pests', 'market', 'technology'],
        required: true
    },
    language: {
        type: String,
        enum: ['Sinhala', 'Tamil', 'English'],
        required: true
    },
    fileUrl: String,
    thumbnailUrl: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resource', ResourceSchema);
