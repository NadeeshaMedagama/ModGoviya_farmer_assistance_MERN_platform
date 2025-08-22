import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../utils/axios';
import { Calendar, Clock, MapPin, MessageSquare, Package } from 'lucide-react';

const PurchaseModal = ({ show, onHide, product, onSuccess }) => {
    const [formData, setFormData] = useState({
        quantity: 1,
        purchaseDate: '',
        deliveryTime: '10 AM',
        deliveryLocation: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [deliveryTimes, setDeliveryTimes] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
    const [showPaymentProof, setShowPaymentProof] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [paymentProof, setPaymentProof] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    useEffect(() => {
        if (show) {
            fetchDeliveryOptions();
            // Set minimum date to today (excluding Sundays)
            const today = new Date();
            let minDate = new Date(today);
            
            // If today is Sunday, set to Monday
            if (today.getDay() === 0) {
                minDate.setDate(today.getDate() + 1);
            }
            
            const formattedDate = minDate.toISOString().split('T')[0];
            setFormData(prev => ({
                ...prev,
                purchaseDate: formattedDate
            }));
        }
    }, [show]);

    const fetchDeliveryOptions = async () => {
        try {
            const [districtsRes, timesRes] = await Promise.all([
                api.get('/orders/delivery/districts'),
                api.get('/orders/delivery/times')
            ]);
            setDistricts(districtsRes.data.data);
            setDeliveryTimes(timesRes.data.data);
        } catch (error) {
            console.error('Failed to fetch delivery options:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            toast.error('Purchase date cannot be in the past');
            return;
        }
        
        if (selectedDate.getDay() === 0) {
            toast.error('Deliveries are not available on Sundays');
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            purchaseDate: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.purchaseDate || !formData.deliveryLocation) {
            setError('Please fill in all required fields');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to place an order');
            window.location.href = '/login';
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const orderData = {
                productId: product._id,
                quantity: parseInt(formData.quantity),
                purchaseDate: formData.purchaseDate,
                deliveryTime: formData.deliveryTime,
                deliveryLocation: formData.deliveryLocation,
                message: formData.message,
                paymentMethod
            };

            const response = await api.post('/orders/create', orderData);
            
            toast.success('Order created successfully!');
            setOrderId(response.data.data._id);
            setShowPaymentProof(true);
            // onSuccess(response.data.data); // Only call after payment proof
            // onHide();
            
            // Reset form
            setFormData({
                quantity: 1,
                purchaseDate: '',
                deliveryTime: '10 AM',
                deliveryLocation: '',
                message: ''
            });
            
        } catch (error) {
            console.error('Error creating order:', error);
            setError(error.response?.data?.message || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentProofSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to submit payment proof');
            window.location.href = '/login';
            return;
        }
        setPaymentLoading(true);
        setPaymentError(null);
        try {
            await api.post(`/orders/${orderId}/payment-proof`, { paymentProof });
            toast.success('Payment proof submitted!');
            setShowPaymentProof(false);
            setPaymentProof('');
            setOrderId(null);
            if (onSuccess) onSuccess();
            if (onHide) onHide();
        } catch (error) {
            setPaymentError(error.response?.data?.message || 'Failed to submit payment proof');
        } finally {
            setPaymentLoading(false);
        }
    };

    const calculateTotal = () => {
        return (product?.price || 0) * formData.quantity;
    };

    const getMinDate = () => {
        const today = new Date();
        let minDate = new Date(today);
        
        // If today is Sunday, set to Monday
        if (today.getDay() === 0) {
            minDate.setDate(today.getDate() + 1);
        }
        
        return minDate.toISOString().split('T')[0];
    };

    const isDateDisabled = (dateString) => {
        const date = new Date(dateString);
        return date.getDay() === 0; // Sunday
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Package className="me-2" />
                    Purchase Product
                </Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && (
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {error}
                        </Alert>
                    )}

                    {/* Product Summary */}
                    <div className="border rounded p-3 mb-4">
                        <Row>
                            <Col md={3}>
                                <img 
                                    src={product?.image} 
                                    alt={product?.title}
                                    className="img-fluid rounded"
                                />
                            </Col>
                            <Col md={9}>
                                <h5>{product?.title}</h5>
                                <p className="text-muted mb-2">{product?.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 text-primary mb-0">${product?.price}</span>
                                    <span className="text-muted">Available: {product?.availability}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <Package className="me-2" />
                                    Quantity
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="99"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <Calendar className="me-2" />
                                    Purchase Date *
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    onChange={handleDateChange}
                                    min={getMinDate()}
                                    required
                                />
                                <Form.Text className="text-muted">
                                    No deliveries on Sundays
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <Clock className="me-2" />
                                    Preferred Delivery Time *
                                </Form.Label>
                                <Form.Select
                                    name="deliveryTime"
                                    value={formData.deliveryTime}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {deliveryTimes.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <MapPin className="me-2" />
                                    Delivery Location *
                                </Form.Label>
                                <Form.Select
                                    name="deliveryLocation"
                                    value={formData.deliveryLocation}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select District</option>
                                    {districts.map(district => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            <MessageSquare className="me-2" />
                            Additional Message
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Any special instructions or notes for your order..."
                            maxLength="500"
                        />
                        <Form.Text className="text-muted">
                            {formData.message.length}/500 characters
                        </Form.Text>
                    </Form.Group>

                    {/* Order Summary */}
                    <div className="border rounded p-3 bg-light">
                        <h6>Order Summary</h6>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Product Price:</span>
                            <span>${product?.price}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Quantity:</span>
                            <span>{formData.quantity}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <strong>Total Amount:</strong>
                            <strong className="text-primary">${calculateTotal()}</strong>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={loading || !formData.purchaseDate || !formData.deliveryLocation}
                    >
                        {loading ? 'Creating Order...' : 'Create Order'}
                    </Button>
                </Modal.Footer>
            </Form>
            {showPaymentProof && (
                <Form onSubmit={handlePaymentProofSubmit} className="mt-4">
                    <Alert variant="info">
                        <strong>Bank Transfer Instructions:</strong><br />
                        Please transfer the total amount to the following bank account:<br />
                        <strong>Bank:</strong> [Your Bank Name]<br />
                        <strong>Account Name:</strong> [Account Name]<br />
                        <strong>Account Number:</strong> [Account Number]<br />
                        <strong>Reference:</strong> Use your Order ID as reference.<br />
                        <br />
                        After completing the transfer, enter your payment reference number below and submit.
                    </Alert>
                    {paymentError && (
                        <Alert variant="danger" onClose={() => setPaymentError(null)} dismissible>
                            {paymentError}
                        </Alert>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Payment Reference Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={paymentProof}
                            onChange={e => setPaymentProof(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={paymentLoading || !paymentProof}>
                        {paymentLoading ? 'Submitting...' : 'Submit Payment Proof'}
                    </Button>
                </Form>
            )}
        </Modal>
    );
};

export default PurchaseModal; 