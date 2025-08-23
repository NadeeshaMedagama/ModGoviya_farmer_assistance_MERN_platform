import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../utils/axios';
import { 
    Calendar, Clock, MapPin, MessageSquare, Package, User, Phone, Globe, 
    CreditCard, Building2, Smartphone, Lock, Shield, Receipt, Download,
    DollarSign, Euro, PoundSterling, Rupee, AlertTriangle, CheckCircle
} from 'lucide-react';

const PurchaseModal = ({ show, onHide, product, onSuccess }) => {
    const [formData, setFormData] = useState({
        quantity: 1,
        purchaseDate: '',
        deliveryTime: '10 AM',
        deliveryLocation: '',
        message: ''
    });
    
    // User profile fields
    const [userProfile, setUserProfile] = useState({
        name: '',
        contactNumber: '',
        location: '',
        country: 'Sri Lanka'
    });
    
    // Enhanced payment fields
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        cardType: ''
    });
    
    // Digital wallet fields
    const [digitalWallet, setDigitalWallet] = useState('paypal');
    
    // BNPL fields
    const [bnplProvider, setBnplProvider] = useState('klarna');
    const [installmentPlan, setInstallmentPlan] = useState(3);
    
    // Currency and localization
    const [currency, setCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(1);
    
    // Security and verification
    const [show3DSecure, setShow3DSecure] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    
    // Order and transaction management
    const [orderId, setOrderId] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [showInvoice, setShowInvoice] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [deliveryTimes, setDeliveryTimes] = useState([]);
    const [showPaymentProof, setShowPaymentProof] = useState(false);
    const [paymentProof, setPaymentProof] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    // Available payment methods
    const paymentMethods = [
        { id: 'credit_card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, MasterCard, AmEx' },
        { id: 'paypal', name: 'PayPal', icon: Smartphone, description: 'Digital wallet payment' },
        { id: 'apple_pay', name: 'Apple Pay', icon: Smartphone, description: 'Apple device payment' },
        { id: 'google_pay', name: 'Google Pay', icon: Smartphone, description: 'Android device payment' },
        { id: 'bank_transfer', name: 'Bank Transfer', icon: Building2, description: 'Direct bank payment' },
        { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: DollarSign, description: 'Pay when you receive' },
        { id: 'klarna', name: 'Klarna', icon: Receipt, description: 'Buy now, pay later' },
        { id: 'afterpay', name: 'Afterpay', icon: Receipt, description: 'Split into 4 payments' }
    ];

    // Available currencies
    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
        { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.85 },
        { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.73 },
        { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rate: 320 },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83 }
    ];

    // BNPL installment plans
    const installmentPlans = [
        { months: 3, fee: 0, description: '3 months interest-free' },
        { months: 6, fee: 2.99, description: '6 months with small fee' },
        { months: 12, fee: 4.99, description: '12 months with fee' }
    ];

    useEffect(() => {
        if (show) {
            fetchDeliveryOptions();
            fetchUserProfile();
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

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            
            const response = await api.get('/users/profile');
            if (response.data.success) {
                const profile = response.data.data;
                setUserProfile({
                    name: profile.name || '',
                    contactNumber: profile.contactNumber || '',
                    location: profile.location || '',
                    country: profile.country || 'Sri Lanka'
                });
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    const updateUserProfile = async () => {
        try {
            setProfileLoading(true);
            const response = await api.put('/users/profile', userProfile);
            if (response.data.success) {
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setProfileLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCardDataChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length <= 16) {
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            setCardData(prev => ({
                ...prev,
                cardNumber: value
            }));
        }
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            setCardData(prev => ({
                ...prev,
                expiryDate: value
            }));
        }
    };

    const validateCardData = () => {
        if (paymentMethod !== 'credit_card') return true;
        
        const { cardNumber, expiryDate, cvv, cardholderName } = cardData;
        
        if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
            toast.error('Please enter a valid 16-digit card number');
            return false;
        }
        
        if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
            toast.error('Please enter expiry date in MM/YY format');
            return false;
        }
        
        if (!cvv.match(/^\d{3,4}$/)) {
            toast.error('Please enter a valid CVV');
            return false;
        }
        
        if (!cardholderName.trim()) {
            toast.error('Please enter cardholder name');
            return false;
        }
        
        return true;
    };

    const processCreditCardPayment = async () => {
        // Simulate payment processing with sample test data
        setProcessingPayment(true);
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Check if it's a test card
            const cardNumber = cardData.cardNumber.replace(/\s/g, '');
            
            // Sample test card numbers for testing
            const testCards = {
                '4242424242424242': 'success', // Visa success
                '4000000000000002': 'declined', // Visa declined
                '4000000000009995': 'insufficient_funds', // Insufficient funds
                '4000000000009987': 'expired_card', // Expired card
                '4000000000009979': 'incorrect_cvc', // Incorrect CVC
                '4000000000000069': 'incorrect_number', // Incorrect number
                '4000000000000127': 'incorrect_number', // Incorrect number
                '4000000000000119': 'card_declined', // Card declined
                '4000000000000001': 'card_declined', // Card declined
                '4000000000000002': 'card_declined', // Card declined
                '4000000000000003': 'card_declined', // Card declined
                '4000000000000004': 'card_declined', // Card declined
                '4000000000000005': 'card_declined', // Card declined
                '4000000000000006': 'card_declined', // Card declined
                '4000000000000007': 'card_declined', // Card declined
                '4000000000000008': 'card_declined', // Card declined
                '4000000000000009': 'card_declined', // Card declined
                '4000000000000010': 'card_declined', // Card declined
            };
            
            const testResult = testCards[cardNumber];
            
            if (testResult === 'success') {
                // Simulate 3D Secure verification for certain cards
                if (cardNumber.startsWith('4000')) {
                    setShow3DSecure(true);
                    return 'pending_3d_secure';
                }
                
                toast.success('Payment successful! Processing your order...');
                return true;
            } else if (testResult === 'declined') {
                toast.error('Payment declined. Please try another card.');
                return false;
            } else if (testResult === 'insufficient_funds') {
                toast.error('Insufficient funds. Please try another card.');
                return false;
            } else if (testResult === 'expired_card') {
                toast.error('Card expired. Please use a valid card.');
                return false;
            } else if (testResult === 'incorrect_cvc') {
                toast.error('Incorrect CVC. Please check and try again.');
                return false;
            } else if (testResult === 'incorrect_number') {
                toast.error('Incorrect card number. Please check and try again.');
                return false;
            } else {
                // For any other card number, simulate success
                toast.success('Payment successful! Processing your order...');
                return true;
            }
        } catch (error) {
            toast.error('Payment processing failed. Please try again.');
            return false;
        } finally {
            setProcessingPayment(false);
        }
    };

    const processDigitalWalletPayment = async () => {
        setProcessingPayment(true);
        
        try {
            // Simulate digital wallet processing
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate success for digital wallets
            toast.success(`${digitalWallet === 'paypal' ? 'PayPal' : digitalWallet === 'apple_pay' ? 'Apple Pay' : 'Google Pay'} payment successful!`);
            return true;
        } catch (error) {
            toast.error('Digital wallet payment failed. Please try again.');
            return false;
        } finally {
            setProcessingPayment(false);
        }
    };

    const processBNPLPayment = async () => {
        setProcessingPayment(true);
        
        try {
            // Simulate BNPL processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const plan = installmentPlans.find(p => p.months === installmentPlan);
            const monthlyAmount = (calculateTotal() + (plan.fee || 0)) / plan.months;
            
            toast.success(`${bnplProvider === 'klarna' ? 'Klarna' : 'Afterpay'} payment approved! ${plan.months} payments of ${currencySymbol}${monthlyAmount.toFixed(2)}`);
            return true;
        } catch (error) {
            toast.error('BNPL payment failed. Please try again.');
            return false;
        } finally {
            setProcessingPayment(false);
        }
    };

    const processCashOnDelivery = async () => {
        setProcessingPayment(true);
        
        try {
            // Simulate COD processing
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success('Cash on Delivery order created successfully!');
            return true;
        } catch (error) {
            toast.error('COD order creation failed. Please try again.');
            return false;
        } finally {
            setProcessingPayment(false);
        }
    };

    const verify3DSecure = async () => {
        if (!otpCode.trim()) {
            toast.error('Please enter the OTP code');
            return false;
        }
        
        setIsVerifying(true);
        
        try {
            // Simulate 3D Secure verification
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (otpCode === '123456') { // Test OTP
                setShow3DSecure(false);
                setOtpCode('');
                toast.success('3D Secure verification successful! Payment completed.');
                return true;
            } else {
                toast.error('Invalid OTP code. Please try again.');
                return false;
            }
        } catch (error) {
            toast.error('3D Secure verification failed. Please try again.');
            return false;
        } finally {
            setIsVerifying(false);
        }
    };

    const generateInvoice = async () => {
        try {
            // Simulate invoice generation
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // In a real implementation, this would generate a PDF invoice
            toast.success('Invoice generated successfully!');
            setShowInvoice(true);
            
            // Simulate download
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = '#';
                link.download = `invoice-${orderId}.pdf`;
                link.click();
            }, 500);
            
        } catch (error) {
            toast.error('Failed to generate invoice. Please try again.');
        }
    };

    const getCurrentCurrency = () => {
        return currencies.find(c => c.code === currency) || currencies[0];
    };

    const currencySymbol = getCurrentCurrency().symbol;
    const currentExchangeRate = getCurrentCurrency().rate;

    const calculateTotalInCurrency = () => {
        return calculateTotal() * currentExchangeRate;
    };

    const calculateInstallmentAmount = () => {
        const plan = installmentPlans.find(p => p.months === installmentPlan);
        const totalWithFee = calculateTotalInCurrency() + (plan.fee || 0);
        return totalWithFee / plan.months;
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
        
        if (!validateCardData()) {
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            // Process payment first if credit card is selected
            if (paymentMethod === 'credit_card') {
                const paymentResult = await processCreditCardPayment();
                if (paymentResult === 'pending_3d_secure') {
                    setOtpCode(''); // Clear OTP for 3D Secure
                    setShow3DSecure(true); // Show 3D Secure modal
                    return;
                }
                if (!paymentResult) {
                    setLoading(false);
                    return;
                }
            } else if (paymentMethod === 'paypal' || paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') {
                const paymentResult = await processDigitalWalletPayment();
                if (!paymentResult) {
                    setLoading(false);
                    return;
                }
            } else if (paymentMethod === 'klarna' || paymentMethod === 'afterpay') {
                const paymentResult = await processBNPLPayment();
                if (!paymentResult) {
                    setLoading(false);
                    return;
                }
            } else if (paymentMethod === 'cash_on_delivery') {
                const paymentResult = await processCashOnDelivery();
                if (!paymentResult) {
                    setLoading(false);
                    return;
                }
            }
            
            // Update user profile
            await updateUserProfile();
            
            // Create order
            const orderData = {
                productId: product._id,
                quantity: formData.quantity,
                purchaseDate: formData.purchaseDate,
                deliveryTime: formData.deliveryTime,
                deliveryLocation: formData.deliveryLocation,
                message: formData.message,
                paymentMethod: paymentMethod,
                totalAmount: calculateTotal()
            };
            
            const response = await api.post('/orders/create', orderData);
            
            if (response.data.success) {
                toast.success('Order created successfully!');
                setOrderId(response.data.data._id);
                
                if (paymentMethod === 'bank_transfer') {
                    setShowPaymentProof(true);
                } else {
                    // For credit card payments, order is already processed
                    if (onSuccess) onSuccess();
                    if (onHide) onHide();
                }
            }
        } catch (error) {
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

                    {/* User Profile Information */}
                    <div className="border rounded p-3 mb-4 bg-light">
                        <h6 className="mb-3">
                            <User className="me-2" />
                            Your Information
                        </h6>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <User className="me-2" />
                                        Full Name *
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={userProfile.name}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <Phone className="me-2" />
                                        Contact Number *
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="contactNumber"
                                        value={userProfile.contactNumber}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <MapPin className="me-2" />
                                        Location
                                    </Form.Label>
                                    <Form.Select
                                        name="location"
                                        value={userProfile.location}
                                        onChange={handleProfileChange}
                                    >
                                        <option value="">Select Location</option>
                                        <option value="Colombo">Colombo</option>
                                        <option value="Kandy">Kandy</option>
                                        <option value="Galle">Galle</option>
                                        <option value="Jaffna">Jaffna</option>
                                        <option value="Negombo">Negombo</option>
                                        <option value="Anuradhapura">Anuradhapura</option>
                                        <option value="Polonnaruwa">Polonnaruwa</option>
                                        <option value="Kurunegala">Kurunegala</option>
                                        <option value="Ratnapura">Ratnapura</option>
                                        <option value="Badulla">Badulla</option>
                                        <option value="Matara">Matara</option>
                                        <option value="Hambantota">Hambantota</option>
                                        <option value="Trincomalee">Trincomalee</option>
                                        <option value="Batticaloa">Batticaloa</option>
                                        <option value="Ampara">Ampara</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <Globe className="me-2" />
                                        Country
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={userProfile.country}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your country"
                                    />
                                </Form.Group>
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
                            <span>{currencySymbol}{calculateTotalInCurrency().toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Quantity:</span>
                            <span>{formData.quantity}</span>
                        </div>
                        {(paymentMethod === 'klarna' || paymentMethod === 'afterpay') && (
                            <>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Installment Fee:</span>
                                    <span>{currencySymbol}{(installmentPlans.find(p => p.months === installmentPlan)?.fee || 0).toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Monthly Payment:</span>
                                    <span>{currencySymbol}{calculateInstallmentAmount().toFixed(2)} × {installmentPlan} months</span>
                                </div>
                            </>
                        )}
                        {paymentMethod === 'cash_on_delivery' && (
                            <div className="d-flex justify-content-between mb-2">
                                <span>COD Fee:</span>
                                <span>{currencySymbol}2.99</span>
                            </div>
                        )}
                        <hr />
                        <div className="d-flex justify-content-between">
                            <strong>Total Amount:</strong>
                            <strong className="text-primary">
                                {currencySymbol}
                                {(() => {
                                    let total = calculateTotalInCurrency();
                                    if (paymentMethod === 'klarna' || paymentMethod === 'afterpay') {
                                        total += (installmentPlans.find(p => p.months === installmentPlan)?.fee || 0);
                                    } else if (paymentMethod === 'cash_on_delivery') {
                                        total += 2.99;
                                    }
                                    return total.toFixed(2);
                                })()}
                            </strong>
                        </div>
                        <div className="mt-2 text-muted small">
                            <Lock className="w-3 h-3 me-1" />
                            Secure payment processing with SSL encryption
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="border rounded p-3 mb-4">
                        <h6 className="mb-3">
                            <Shield className="me-2" />
                            Payment Method
                        </h6>
                        <Row>
                            {paymentMethods.map(method => (
                                <Col md={4} key={method.id}>
                                    <Form.Check
                                        type="radio"
                                        id={method.id}
                                        name="paymentMethod"
                                        value={method.id}
                                        checked={paymentMethod === method.id}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        label={
                                            <div className="d-flex align-items-center">
                                                <method.icon className="me-2" />
                                                {method.name}
                                                {method.description && (
                                                    <Badge bg="secondary" className="ms-2">
                                                        {method.description}
                                                    </Badge>
                                                )}
                                            </div>
                                        }
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Currency Selection */}
                    <div className="border rounded p-3 mb-4">
                        <h6 className="mb-3">
                            <DollarSign className="me-2" />
                            Currency & Localization
                        </h6>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Select Currency</Form.Label>
                                    <Form.Select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    >
                                        {currencies.map(curr => (
                                            <option key={curr.code} value={curr.code}>
                                                {curr.symbol} {curr.name} ({curr.code})
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <div className="p-3 bg-light rounded">
                                    <strong>Exchange Rate:</strong> 1 USD = {currentExchangeRate} {currency}
                                    <br />
                                    <strong>Total in {currency}:</strong> {currencySymbol}{calculateTotalInCurrency().toFixed(2)}
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Credit Card Form */}
                    {paymentMethod === 'credit_card' && (
                        <div className="border rounded p-3 mb-4 bg-light">
                            <h6 className="mb-3">
                                <CreditCard className="me-2" />
                                Credit Card Information
                                <Badge bg="success" className="ms-2">
                                    <Lock className="w-3 h-3 me-1" />
                                    Secure
                                </Badge>
                            </h6>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Card Number *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cardNumber"
                                            value={cardData.cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            Enter 16-digit card number
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Expiry Date *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="expiryDate"
                                            value={cardData.expiryDate}
                                            onChange={handleExpiryChange}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            Format: MM/YY
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CVV *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cvv"
                                            value={cardData.cvv}
                                            onChange={handleCardDataChange}
                                            placeholder="123"
                                            maxLength="4"
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            3 or 4 digit security code
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Cardholder Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cardholderName"
                                            value={cardData.cardholderName}
                                            onChange={handleCardDataChange}
                                            placeholder="Enter cardholder name as it appears on card"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            {/* Test Card Information */}
                            <Alert variant="info" className="mt-3">
                                <strong>🧪 Test Cards for Development:</strong><br />
                                <strong>Success:</strong> 4242 4242 4242 4242<br />
                                <strong>3D Secure:</strong> 4000 0000 0000 0002<br />
                                <strong>Declined:</strong> 4000 0000 0000 0002<br />
                                <strong>Insufficient Funds:</strong> 4000 0000 0000 9995<br />
                                <strong>Expired Card:</strong> 4000 0000 0000 9987<br />
                                <strong>Incorrect CVC:</strong> 4000 0000 0000 9979<br />
                                <strong>Any other number:</strong> Simulates success<br />
                                <strong>Expiry:</strong> Use any future date (e.g., 12/25)<br />
                                <strong>CVV:</strong> Use any 3 digits (e.g., 123)
                            </Alert>
                        </div>
                    )}

                    {/* Digital Wallet Form */}
                    {(paymentMethod === 'paypal' || paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') && (
                        <div className="border rounded p-3 mb-4 bg-light">
                            <h6 className="mb-3">
                                <Smartphone className="me-2" />
                                {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'apple_pay' ? 'Apple Pay' : 'Google Pay'} Payment
                            </h6>
                            <Alert variant="info">
                                <strong>Secure Digital Payment:</strong><br />
                                You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'apple_pay' ? 'Apple Pay' : 'Google Pay'} to complete your payment securely.
                                <br />
                                <strong>No card details stored</strong> - your payment information is protected.
                            </Alert>
                        </div>
                    )}

                    {/* BNPL Form */}
                    {(paymentMethod === 'klarna' || paymentMethod === 'afterpay') && (
                        <div className="border rounded p-3 mb-4 bg-light">
                            <h6 className="mb-3">
                                <Receipt className="me-2" />
                                {bnplProvider === 'klarna' ? 'Klarna' : 'Afterpay'} - Buy Now, Pay Later
                            </h6>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Installment Plan</Form.Label>
                                        <Form.Select
                                            value={installmentPlan}
                                            onChange={(e) => setInstallmentPlan(parseInt(e.target.value))}
                                        >
                                            {installmentPlans.map(plan => (
                                                <option key={plan.months} value={plan.months}>
                                                    {plan.months} months - {plan.description}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <div className="p-3 bg-light rounded">
                                        <strong>Monthly Payment:</strong> {currencySymbol}{calculateInstallmentAmount().toFixed(2)}<br />
                                        <strong>Total with Fees:</strong> {currencySymbol}{(calculateTotalInCurrency() + (installmentPlans.find(p => p.months === installmentPlan)?.fee || 0)).toFixed(2)}
                                    </div>
                                </Col>
                            </Row>
                            <Alert variant="warning">
                                <strong>Important:</strong> Late payments may incur additional fees. 
                                Please ensure you can afford the monthly payments before proceeding.
                            </Alert>
                        </div>
                    )}

                    {/* Cash on Delivery Form */}
                    {paymentMethod === 'cash_on_delivery' && (
                        <div className="border rounded p-3 mb-4 bg-light">
                            <h6 className="mb-3">
                                <DollarSign className="me-2" />
                                Cash on Delivery
                            </h6>
                            <Alert variant="info">
                                <strong>Pay When You Receive:</strong><br />
                                • No upfront payment required<br />
                                • Pay with cash when your order arrives<br />
                                • Additional COD fee may apply<br />
                                • Available in selected areas only
                            </Alert>
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={loading || processingPayment}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={loading || processingPayment || !formData.purchaseDate || !formData.deliveryLocation || !userProfile.name || !userProfile.contactNumber || (paymentMethod === 'credit_card' && (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName))}
                    >
                        {processingPayment ? 'Processing Payment...' : 
                         loading ? 'Creating Order...' : 
                         paymentMethod === 'credit_card' ? 'Pay & Create Order' : 'Create Order'}
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

            {/* 3D Secure Modal */}
            {show3DSecure && (
                <Modal show={show3DSecure} onHide={() => setShow3DSecure(false)} size="sm" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Shield className="me-2" />
                            3D Secure Verification
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant="warning">
                            <strong>Additional Security Required:</strong><br />
                            Your bank requires additional verification for this transaction.
                        </Alert>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter OTP Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                maxLength="6"
                                required
                            />
                            <Form.Text className="text-muted">
                                Check your SMS/email for the OTP code from your bank.
                                <br />
                                <strong>Test OTP:</strong> 123456
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow3DSecure(false)}>
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={verify3DSecure}
                            disabled={isVerifying || !otpCode.trim()}
                        >
                            {isVerifying ? 'Verifying...' : 'Verify & Complete Payment'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Invoice Modal */}
            {showInvoice && (
                <Modal show={showInvoice} onHide={() => setShowInvoice(false)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Receipt className="me-2" />
                            Order Invoice
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <CheckCircle className="w-16 h-16 text-success mb-3" />
                            <h4>Payment Successful!</h4>
                            <p className="text-muted">Your order has been confirmed and payment processed.</p>
                        </div>
                        
                        <div className="border rounded p-3 mb-4">
                            <h6>Order Details</h6>
                            <Row>
                                <Col md={6}>
                                    <strong>Order ID:</strong> {orderId}<br />
                                    <strong>Transaction ID:</strong> {transactionId || 'TXN-' + Date.now()}<br />
                                    <strong>Payment Method:</strong> {paymentMethods.find(m => m.id === paymentMethod)?.name}<br />
                                    <strong>Payment Status:</strong> 
                                    <Badge bg="success" className="ms-2">Paid</Badge>
                                </Col>
                                <Col md={6}>
                                    <strong>Order Date:</strong> {new Date().toLocaleDateString()}<br />
                                    <strong>Payment Date:</strong> {new Date().toLocaleDateString()}<br />
                                    <strong>Currency:</strong> {currency}<br />
                                    <strong>Total Amount:</strong> {currencySymbol}{calculateTotalInCurrency().toFixed(2)}
                                </Col>
                            </Row>
                        </div>

                        <div className="border rounded p-3 mb-4">
                            <h6>Product Details</h6>
                            <Row>
                                <Col md={3}>
                                    <img 
                                        src={product?.image} 
                                        alt={product?.title}
                                        className="img-fluid rounded"
                                    />
                                </Col>
                                <Col md={9}>
                                    <h6>{product?.title}</h6>
                                    <p className="text-muted mb-2">{product?.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="h6 text-primary mb-0">Quantity: {formData.quantity}</span>
                                        <span className="h6 text-primary mb-0">{currencySymbol}{calculateTotalInCurrency().toFixed(2)}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Alert variant="info">
                            <strong>Next Steps:</strong><br />
                            • You will receive an email confirmation shortly<br />
                            • Track your order status in your account<br />
                            • Contact support if you have any questions<br />
                            • Download your invoice below
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowInvoice(false)}>
                            Close
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={generateInvoice}
                            className="d-flex align-items-center"
                        >
                            <Download className="me-2" />
                            Download Invoice
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Modal>
    );
};

export default PurchaseModal; 