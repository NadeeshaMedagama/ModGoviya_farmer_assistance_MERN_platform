import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { Calendar, Clock, MapPin, Package, User, Mail, Phone, Globe } from 'lucide-react';

const Orders = () => {
    const { user, token, isAuthenticated } = useAuth();
    
    // Set axios authorization header
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [deliveryTimes, setDeliveryTimes] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
            fetchDeliveryOptions();
        } else {
            setLoading(false);
            setError('Please login to view your orders');
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/orders/my-orders');
            setOrders(response.data.data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
            if (error.response?.status === 401) {
                setError('Please login to view your orders');
            } else if (error.response?.status === 404) {
                setError('Orders endpoint not found');
            } else {
                setError('Failed to fetch orders. Please try again later.');
            }
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const fetchDeliveryOptions = async () => {
        try {
            const [districtsRes, timesRes] = await Promise.all([
                api.get('/orders/delivery/districts'),
                api.get('/orders/delivery/times')
            ]);
            setDistricts(districtsRes.data.data || []);
            setDeliveryTimes(timesRes.data.data || []);
        } catch (error) {
            console.error('Failed to fetch delivery options:', error);
            // Don't show error for delivery options as they're not critical
        }
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'pending': 'warning',
            'processing': 'info',
            'shipped': 'primary',
            'delivered': 'success',
            'cancelled': 'danger'
        };
        return <Badge bg={statusColors[status] || 'secondary'}>{status}</Badge>;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    const formatTime = (timeString) => {
        return timeString || 'N/A';
    };

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <Package size={64} className="text-muted mb-3" />
                    <h5 className="text-muted">Please Login</h5>
                    <p className="text-muted">You need to be logged in to view your orders.</p>
                    <Button variant="primary" href="/login">
                        Login
                    </Button>
                </div>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    {error}
                    <div className="mt-3">
                        <Button variant="outline-danger" onClick={fetchOrders}>
                            Try Again
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {/* User Profile Section */}
            <Row className="mb-5">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h4 className="mb-0">
                                <User className="me-2" />
                                User Profile
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <User className="me-2 text-primary" size={20} />
                                        <strong>Name:</strong>
                                        <span className="ms-2">{user?.name || user?.fullName || 'N/A'}</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <Mail className="me-2 text-primary" size={20} />
                                        <strong>Email:</strong>
                                        <span className="ms-2">{user?.email || 'N/A'}</span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <Phone className="me-2 text-primary" size={20} />
                                        <strong>Contact:</strong>
                                        <span className="ms-2">{user?.contactNumber || user?.mobile || 'N/A'}</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <Globe className="me-2 text-primary" size={20} />
                                        <strong>Country:</strong>
                                        <span className="ms-2">{user?.country || 'Sri Lanka'}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Orders Section */}
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-success text-white">
                            <h4 className="mb-0">
                                <Package className="me-2" />
                                My Orders
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            {orders.length === 0 ? (
                                <div className="text-center py-5">
                                    <Package size={64} className="text-muted mb-3" />
                                    <h5 className="text-muted">No orders found</h5>
                                    <p className="text-muted">You haven't placed any orders yet.</p>
                                    <Button variant="primary" href="/marketplace">
                                        Browse Products
                                    </Button>
                                </div>
                            ) : (
                                <Row>
                                    {orders.map((order) => (
                                        <Col key={order._id || order.id} lg={6} className="mb-4">
                                            <Card className="h-100 shadow-sm order-card">
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <h6 className="card-title mb-0">
                                                            Order #{order.orderNumber || 'N/A'}
                                                        </h6>
                                                        {getStatusBadge(order.status)}
                                                    </div>
                                                    
                                                    {order.items && order.items.length > 0 ? order.items.map((item, index) => (
                                                        <div key={index} className="mb-3">
                                                            <div className="d-flex align-items-center">
                                                                <img 
                                                                    src={item.product?.image || '/placeholder-image.png'} 
                                                                    alt={item.product?.title || 'Product'}
                                                                    className="rounded me-3"
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                    onError={(e) => {
                                                                        e.target.src = '/placeholder-image.png';
                                                                        e.target.onerror = null;
                                                                    }}
                                                                />
                                                                <div className="flex-grow-1">
                                                                    <h6 className="mb-1">{item.product?.title || 'Product Title'}</h6>
                                                                    <p className="text-muted mb-1">
                                                                        Quantity: {item.quantity || 0} × ${item.price || 0}
                                                                    </p>
                                                                    <p className="text-muted mb-0">
                                                                        Seller: {item.seller?.name || 'N/A'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        <div className="text-muted">
                                                            <p>No items found for this order</p>
                                                        </div>
                                                    )}
                                                    
                                                    <hr />
                                                    
                                                    <div className="row text-muted small">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center mb-2">
                                                                <Calendar size={16} className="me-2" />
                                                                <span>Purchase: {formatDate(order.purchaseDate)}</span>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <Clock size={16} className="me-2" />
                                                                <span>Delivery: {formatTime(order.deliveryTime)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center mb-2">
                                                                <MapPin size={16} className="me-2" />
                                                                <span>{order.deliveryLocation || 'N/A'}</span>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <strong className="text-dark">
                                                                    Total: ${order.totalAmount || 0}
                                                                </strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {order.message && (
                                                        <div className="mt-3">
                                                            <small className="text-muted">
                                                                <strong>Message:</strong> {order.message}
                                                            </small>
                                                        </div>
                                                    )}
                                                    
                                                    <div className="mt-3">
                                                        <Button 
                                                            variant="outline-primary" 
                                                            size="sm"
                                                            onClick={() => handleOrderClick(order)}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Order Details Modal */}
            <Modal 
                show={showOrderModal} 
                onHide={() => setShowOrderModal(false)}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Order Details - #{selectedOrder?.orderNumber}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <h6>Order Information</h6>
                                    <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                                    <p><strong>Purchase Date:</strong> {formatDate(selectedOrder.purchaseDate)}</p>
                                    <p><strong>Delivery Time:</strong> {formatTime(selectedOrder.deliveryTime)}</p>
                                    <p><strong>Delivery Location:</strong> {selectedOrder.deliveryLocation || 'N/A'}</p>
                                    <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount || 0}</p>
                                </Col>
                                <Col md={6}>
                                    <h6>Shipping Address</h6>
                                    <p>{selectedOrder.shippingAddress?.name || 'N/A'}</p>
                                    <p>{selectedOrder.shippingAddress?.address || 'N/A'}</p>
                                    <p>{selectedOrder.shippingAddress?.district || 'N/A'}, {selectedOrder.shippingAddress?.province || 'N/A'}</p>
                                    <p>Phone: {selectedOrder.shippingAddress?.phone || 'N/A'}</p>
                                </Col>
                            </Row>
                            
                            <hr />
                            
                            <h6>Order Items</h6>
                            {selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items.map((item, index) => (
                                <div key={index} className="d-flex align-items-center mb-3 p-3 border rounded">
                                    <img 
                                        src={item.product?.image || '/placeholder-image.png'} 
                                        alt={item.product?.title || 'Product'}
                                        className="rounded me-3"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.png';
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{item.product?.title || 'Product Title'}</h6>
                                        <p className="text-muted mb-1">{item.product?.description || 'No description available'}</p>
                                        <p className="mb-1">
                                            <strong>Quantity:</strong> {item.quantity || 0} × ${item.price || 0}
                                        </p>
                                        <p className="mb-0">
                                            <strong>Seller:</strong> {item.seller?.name || 'N/A'} ({item.seller?.email || 'N/A'})
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-muted">
                                    <p>No items found for this order</p>
                                </div>
                            )}
                            
                            {selectedOrder.message && (
                                <div className="mt-3">
                                    <h6>Additional Message</h6>
                                    <p className="text-muted">{selectedOrder.message}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Orders; 