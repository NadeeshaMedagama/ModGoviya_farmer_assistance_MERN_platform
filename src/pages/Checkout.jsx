import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import {
    CreditCard,
    Lock,
    MapPin,
    User,
    Mail,
    Phone,
    ShoppingBag,
    CheckCircle,
    ArrowLeft,
    Shield
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useTranslation } from 'react-i18next';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        // Shipping Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Sri Lanka',

        // Payment Information
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',

        // Order notes
        orderNotes: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            // Validate shipping information
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            if (!formData.address.trim()) newErrors.address = 'Address is required';
            if (!formData.city.trim()) newErrors.city = 'City is required';
            if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        }

        if (step === 2) {
            // Validate payment information
            if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
            else if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Card number must be 16 digits';
            if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
            if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
            else if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';
            if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const calculateTotal = () => {
        return cart.items.reduce(
            (total, item) => total + (item.product.price * item.quantity),
            0
        );
    };

    const handleCompleteOrder = async () => {
        if (!validateStep(2)) return;

        setLoading(true);

        try {
            // Simulate API call for payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate order ID
            const newOrderId = 'ORD-' + Date.now().toString().slice(-8);
            setOrderId(newOrderId);

            // Clear cart and show success
            clearCart();
            setOrderComplete(true);
            setCurrentStep(3);
        } catch (error) {
            console.error('Order processing failed:', error);
            setErrors({ general: 'Payment processing failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const formatCardNumber = (value) => {
        // Remove all spaces and non-digits
        const cleanValue = value.replace(/\D/g, '');
        // Add space every 4 digits
        const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        return formattedValue;
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        if (formatted.replace(/\s/g, '').length <= 16) {
            setFormData(prev => ({ ...prev, cardNumber: formatted }));
        }
    };

    if (cart.items.length === 0 && !orderComplete) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            Your cart is empty
                        </h3>
                        <Link
                            to="/marketplace"
                            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/cart"
                        className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                        <ShoppingBag className="w-8 h-8 mr-3 text-green-600" />
                        Checkout
                    </h1>
                </div>

                {/* Progress Steps */}
                {!orderComplete && (
                    <div className="mb-8">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-4">
                                <div className={`flex items-center ${currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                                        1
                                    </div>
                                    <span className="ml-2 font-medium">Shipping</span>
                                </div>
                                <div className={`w-8 h-1 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                                <div className={`flex items-center ${currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                                        2
                                    </div>
                                    <span className="ml-2 font-medium">Payment</span>
                                </div>
                                <div className={`w-8 h-1 ${currentStep >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                                <div className={`flex items-center ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                                        3
                                    </div>
                                    <span className="ml-2 font-medium">Confirmation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">{errors.general}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Step 1: Shipping Information */}
                        {currentStep === 1 && (
                            <div className="bg-white shadow-sm rounded-xl p-6">
                                <div className="flex items-center mb-6">
                                    <MapPin className="w-6 h-6 text-green-600 mr-3" />
                                    <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`}
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Enter last name"
                                        />
                                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                                                placeholder="+94 XX XXX XXXX"
                                            />
                                        </div>
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Enter full address"
                                        />
                                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Enter city"
                                        />
                                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Postal Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.postalCode ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Enter postal code"
                                        />
                                        {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            name="orderNotes"
                                            value={formData.orderNotes}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Any special instructions for your order"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={handleNextStep}
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Payment Information */}
                        {currentStep === 2 && (
                            <div className="bg-white shadow-sm rounded-xl p-6">
                                <div className="flex items-center mb-6">
                                    <CreditCard className="w-6 h-6 text-green-600 mr-3" />
                                    <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                                    <div className="ml-auto flex items-center text-sm text-gray-500">
                                        <Shield className="w-4 h-4 mr-1" />
                                        Secure Payment
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Number *
                                        </label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleCardNumberChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'}`}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                        </div>
                                        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Expiry Date *
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'}`}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                            />
                                            {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVV *
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.cvv ? 'border-red-300' : 'border-gray-300'}`}
                                                    placeholder="123"
                                                    maxLength="3"
                                                />
                                            </div>
                                            {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cardholder Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.cardName ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Name as it appears on card"
                                        />
                                        {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={handlePreviousStep}
                                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                    >
                                        Back to Shipping
                                    </button>
                                    <button
                                        onClick={handleCompleteOrder}
                                        disabled={loading}
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="w-4 h-4 mr-2" />
                                                Complete Order
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Order Confirmation */}
                        {currentStep === 3 && orderComplete && (
                            <div className="bg-white shadow-sm rounded-xl p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                                <p className="text-gray-600 mb-4">
                                    Thank you for your order. We've received your payment and will start processing your order shortly.
                                </p>
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-gray-600">Order ID</p>
                                    <p className="text-lg font-bold text-gray-900">{orderId}</p>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 mb-6">
                                    <p>• A confirmation email has been sent to {formData.email}</p>
                                    <p>• You can track your order status in your account</p>
                                    <p>• Estimated delivery: 3-5 business days</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        to="/orders"
                                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                    >
                                        Track Order
                                    </Link>
                                    <Link
                                        to="/marketplace"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    {!orderComplete && (
                        <div>
                            <div className="bg-white shadow-sm rounded-xl p-6 sticky top-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {cart.items.map((item) => (
                                        <div key={item._id} className="flex gap-3">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                                    {item.product.title}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                Rs: {(item.product.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">Rs: {calculateTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">Rs: 0</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium">Rs: 0</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-gray-900">Total</span>
                                            <span className="font-bold text-green-600 text-lg">
                                                Rs: {calculateTotal().toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="mt-6 flex items-start space-x-2 text-xs text-gray-500">
                                    <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    <p>
                                        Your payment information is encrypted and secure. We never store your card details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Checkout;
