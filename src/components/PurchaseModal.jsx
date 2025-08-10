import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
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
                axios.get('/api/orders/delivery/districts'),
                axios.get('/api/orders/delivery/times')
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

        setLoading(true);
        setError(null);

        try {
            const orderData = {
                productId: product._id,
                quantity: parseInt(formData.quantity),
                purchaseDate: formData.purchaseDate,
                deliveryTime: formData.deliveryTime,
                deliveryLocation: formData.deliveryLocation,
                message: formData.message
            };

            const response = await axios.post('/api/orders/create', orderData);
            
            toast.success('Order created successfully!');
            onSuccess(response.data.data);
            onHide();
            
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
        </Modal>
    );
};

export default PurchaseModal; 