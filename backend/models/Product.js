const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: ['seeds', 'crops', 'tools', 'fertilizers', 'equipment', 'livestock', 'services']
    },
    location: { type: String, required: true },
    seller: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String, enum: ['new', 'used'], default: 'new' },
    availability: { type: String, default: 'Available' },
    contact: {
        phone: { type: String },
        email: { type: String }
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
