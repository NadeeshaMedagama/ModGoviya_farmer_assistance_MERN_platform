const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();


// Validation for creating orders
const createOrderValidation = [
    body('productId')
        .isMongoId()
        .withMessage('Valid product ID is required'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    body('purchaseDate')
        .isISO8601()
        .custom((value) => {
            const date = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (date < today) {
                throw new Error('Purchase date cannot be in the past');
            }
            
            if (date.getDay() === 0) { // Sunday = 0
                throw new Error('Deliveries are not available on Sundays');
            }
            
            return true;
        })
        .withMessage('Purchase date must be today or future date (excluding Sundays)'),
    body('deliveryTime')
        .isIn(['10 AM', '11 AM', '12 PM'])
        .withMessage('Delivery time must be 10 AM, 11 AM, or 12 PM'),
    body('deliveryLocation')
        .isString()
        .trim()
        .isLength({ min: 1 })
        .withMessage('Delivery location is required'),
    body('message')
        .optional()
        .isString()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Message cannot exceed 500 characters')
];

// Get all orders for authenticated user
router.get('/my-orders', requireAuth, async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate('items.product', 'title price image')
            .populate('items.seller', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders'
        });
    }
});

// Create new order
router.post('/create', requireAuth, createOrderValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const {
            productId,
            quantity,
            purchaseDate,
            deliveryTime,
            deliveryLocation,
            message,
            paymentMethod
        } = req.body;

        // Get product details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if product has a seller
        if (!product.userId) {
            return res.status(400).json({
                success: false,
                message: 'Product does not have a valid seller'
            });
        }

        // Get user profile information
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user has required profile information
        if (!user.name || user.name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Please complete your profile information (name) before placing an order'
            });
        }

        if (!user.contactNumber || user.contactNumber.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Please complete your profile information (contact number) before placing an order'
            });
        }

        // Create order
        const order = new Order({
            buyer: req.user._id,
            buyerUsername: (user.email && user.email.includes('@')) ? user.email.split('@')[0] : (user.name || 'user'),
            items: [{
                product: productId,
                seller: product.userId,
                quantity: quantity,
                price: product.price,
                status: 'pending'
            }],
            shippingAddress: {
                name: user.name,
                phone: user.contactNumber || '',
                address: deliveryLocation,
                district: deliveryLocation,
                province: user.country || 'Sri Lanka'
            },
            paymentMethod: paymentMethod || 'bank_transfer',
            totalAmount: product.price * quantity,
            notes: message,
            purchaseDate: purchaseDate,
            deliveryTime: deliveryTime,
            deliveryLocation: deliveryLocation
        });

        await order.save();

        // Populate order details for response
        await order.populate('items.product', 'title price image');
        await order.populate('items.seller', 'name email');

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order'
        });
    }
});

// Get order by ID (only for the order owner)
router.get('/:orderId', requireAuth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate('items.product', 'title price image description')
            .populate('items.seller', 'name email contact')
            .populate('buyer', 'name email contactNumber country');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns this order
        if (order.buyer._id.toString() !== req.user._id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only view your own orders.'
            });
        }

        res.json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order'
        });
    }
});

// Update order status (only for the order owner)
router.patch('/:orderId/status', requireAuth, async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns this order
        if (order.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only update your own orders.'
            });
        }

        order.status = status;
        await order.save();

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update order status'
        });
    }
});

// Add new endpoint for uploading payment proof
router.post('/:orderId/payment-proof', requireAuth, async (req, res) => {
    try {
        const { paymentProof } = req.body;
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        if (order.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        order.paymentProof = paymentProof;
        order.paymentStatus = 'paid';
        await order.save();
        res.json({ success: true, message: 'Payment proof submitted', data: order });
    } catch (error) {
        console.error('Error uploading payment proof:', error);
        res.status(500).json({ success: false, message: 'Failed to upload payment proof' });
    }
});

// Get delivery districts (Sri Lanka districts)
router.get('/delivery/districts', (req, res) => {
    const districts = [
        'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
        'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
        'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
        'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
        'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
    ];

    res.json({
        success: true,
        data: districts
    });
});

// Get available delivery times
router.get('/delivery/times', (req, res) => {
    const deliveryTimes = ['10 AM', '11 AM', '12 PM'];
    
    res.json({
        success: true,
        data: deliveryTimes
    });
});

module.exports = router; 