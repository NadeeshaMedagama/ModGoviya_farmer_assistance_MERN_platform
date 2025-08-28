const express = require('express');
const { body } = require('express-validator');
const { createConsultation, getConsultationsByEmail } = require('../controllers/consultationController');

const router = express.Router();

const createValidation = [
    body('expertId').trim().isLength({ min: 1 }).withMessage('Expert is required'),
    body('expertName').trim().isLength({ min: 1 }).withMessage('Expert name is required'),
    body('serviceType').isIn(['video-call', 'phone-call', 'field-visit', 'report-analysis']).withMessage('Invalid service type'),
    body('selectedDate').isISO8601().withMessage('Valid date required'),
    body('selectedTime').trim().isLength({ min: 1 }).withMessage('Time is required'),
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('phone').trim().isLength({ min: 6 }).withMessage('Phone is required'),
    body('location').trim().isLength({ min: 2 }).withMessage('Location is required'),
    body('priority').optional().isIn(['low', 'medium', 'high', 'critical'])
];

router.post('/', createValidation, createConsultation);
router.get('/user/:email', getConsultationsByEmail);

module.exports = router;


