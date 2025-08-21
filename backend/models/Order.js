const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        }
    }],
    // New fields for e-commerce requirements
    purchaseDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value >= today && value.getDay() !== 0; // No Sundays
            },
            message: 'Purchase date must be today or future date (excluding Sundays)'
        }
    },
    deliveryTime: {
        type: String,
        required: true,
        enum: ['10 AM', '11 AM', '12 PM']
    },
    deliveryLocation: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        trim: true,
        maxlength: 500
    },
    shippingAddress: {
        name: String,
        phone: String,
        address: String,
        city: String,
        district: String,
        province: String,
        postalCode: String
    },
    paymentMethod: {
        type: String,
        enum: ['cash_on_delivery', 'bank_transfer', 'mobile_payment'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    notes: String
}, {
    timestamps: true
});

// Generate order number before saving
OrderSchema.pre('save', function(next) {
    if (!this.orderNumber) {
        this.orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
