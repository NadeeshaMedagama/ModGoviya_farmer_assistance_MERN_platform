const { validationResult } = require('express-validator');
const Consultation = require('../models/Consultation');

exports.createConsultation = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const consultation = await Consultation.create(req.body);
        return res.status(201).json({ success: true, data: consultation });
    } catch (error) {
        console.error('Create consultation error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getConsultationsByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const consultations = await Consultation.find({ email }).sort({ createdAt: -1 });
        return res.json({ success: true, data: consultations });
    } catch (error) {
        console.error('Get consultations error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


