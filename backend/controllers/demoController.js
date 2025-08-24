const DemoSchedule = require('../models/DemoSchedule');
const asyncHandler = require('express-async-handler');

// @desc    Schedule a new demo
// @route   POST /api/demo/schedule
// @access  Public
const scheduleDemo = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
        employees,
        industry,
        timezone,
        demoType,
        interests,
        message,
        selectedDate,
        selectedTime
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !selectedDate || !selectedTime) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if demo already exists for the same date and time
    const existingDemo = await DemoSchedule.findOne({
        selectedDate: new Date(selectedDate),
        selectedTime,
        status: { $in: ['pending', 'confirmed'] }
    });

    if (existingDemo) {
        res.status(400);
        throw new Error('This time slot is already booked. Please select another time.');
    }

    // Create demo schedule
    const demo = await DemoSchedule.create({
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
        employees,
        industry,
        timezone,
        demoType,
        interests,
        message,
        selectedDate: new Date(selectedDate),
        selectedTime
    });

    if (demo) {
        res.status(201).json({
            success: true,
            message: 'Demo scheduled successfully',
            data: {
                _id: demo._id,
                firstName: demo.firstName,
                lastName: demo.lastName,
                email: demo.email,
                company: demo.company,
                demoType: demo.demoType,
                selectedDate: demo.selectedDate,
                selectedTime: demo.selectedTime,
                status: demo.status
            }
        });
    } else {
        res.status(400);
        throw new Error('Failed to schedule demo');
    }
});

// @desc    Get all demo schedules (admin only)
// @route   GET /api/demo/all
// @access  Private/Admin
const getAllDemos = asyncHandler(async (req, res) => {
    const demos = await DemoSchedule.find({})
        .sort({ scheduledAt: -1 })
        .select('-__v');

    res.json({
        success: true,
        count: demos.length,
        data: demos
    });
});

// @desc    Get demo by ID
// @route   GET /api/demo/:id
// @access  Private
const getDemoById = asyncHandler(async (req, res) => {
    const demo = await DemoSchedule.findById(req.params.id);

    if (demo) {
        res.json({
            success: true,
            data: demo
        });
    } else {
        res.status(404);
        throw new Error('Demo not found');
    }
});

// @desc    Update demo status
// @route   PUT /api/demo/:id/status
// @access  Private/Admin
const updateDemoStatus = asyncHandler(async (req, res) => {
    const { status, notes } = req.body;

    if (!status) {
        res.status(400);
        throw new Error('Status is required');
    }

    const demo = await DemoSchedule.findById(req.params.id);

    if (!demo) {
        res.status(404);
        throw new Error('Demo not found');
    }

    demo.status = status;
    if (notes) demo.notes = notes;
    if (status === 'confirmed') demo.confirmedAt = new Date();

    const updatedDemo = await demo.save();

    res.json({
        success: true,
        message: 'Demo status updated successfully',
        data: updatedDemo
    });
});

// @desc    Get demos by email
// @route   GET /api/demo/user/:email
// @access  Public
const getDemosByEmail = asyncHandler(async (req, res) => {
    const demos = await DemoSchedule.find({ email: req.params.email })
        .sort({ scheduledAt: -1 })
        .select('-__v');

    res.json({
        success: true,
        count: demos.length,
        data: demos
    });
});

// @desc    Cancel demo
// @route   PUT /api/demo/:id/cancel
// @access  Public
const cancelDemo = asyncHandler(async (req, res) => {
    const demo = await DemoSchedule.findById(req.params.id);

    if (!demo) {
        res.status(404);
        throw new Error('Demo not found');
    }

    if (demo.status === 'cancelled') {
        res.status(400);
        throw new Error('Demo is already cancelled');
    }

    if (demo.status === 'completed') {
        res.status(400);
        throw new Error('Cannot cancel completed demo');
    }

    demo.status = 'cancelled';
    const updatedDemo = await demo.save();

    res.json({
        success: true,
        message: 'Demo cancelled successfully',
        data: updatedDemo
    });
});

module.exports = {
    scheduleDemo,
    getAllDemos,
    getDemoById,
    updateDemoStatus,
    getDemosByEmail,
    cancelDemo
};
