const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: String, default: 'Anonymous' },
    content: { type: String, required: true, trim: true },
    likes: { type: Number, default: 0 }
}, { timestamps: true });

const CommunityPostSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    anonymous: { type: Boolean, default: false },
    author: { type: String, default: 'Anonymous' },
    location: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: { type: [CommentSchema], default: [] },
    trending: { type: Boolean, default: false },
    urgent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('CommunityPost', CommunityPostSchema);


