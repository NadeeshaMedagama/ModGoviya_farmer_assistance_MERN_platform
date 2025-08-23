const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Farm name is required']
    },
    size: {
        type: Number,
        required: [true, 'Farm size is required'],
        min: [0.1, 'Farm size must be at least 0.1 acres']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    soilType: {
        type: String,
        enum: ['Red', 'Brown', 'Laterite', 'Alluvial', 'Mountain', 'Other'],
        required: true
    },
    crops: [{
        name: String,
        area: Number,
        plantingDate: Date,
        harvestDate: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Farm', FarmSchema);
