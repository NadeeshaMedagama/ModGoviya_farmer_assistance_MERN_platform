import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { Calendar, Clock, MapPin, Package, User, Mail, Phone, Globe, X, Truck, Leaf } from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

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
        const statusStyles = {
            'pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            'processing': 'bg-blue-100 text-blue-800 border border-blue-200',
            'shipped': 'bg-purple-100 text-purple-800 border border-purple-200',
            'delivered': 'bg-green-100 text-green-800 border border-green-200',
            'cancelled': 'bg-red-100 text-red-800 border border-red-200'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
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
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto text-center">
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
                            <Package size={64} className="text-green-500 mb-4 mx-auto" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
                            <p className="text-gray-600 mb-6">You need to be logged in to view your orders.</p>
                            <a
                                href="/login"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 inline-block"
                            >
                                Login Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <X className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={fetchOrders}
                                            className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 py-8">

            <Header />

            <div className="container mx-auto px-4 max-w-7xl py-16">

                {/* Header with Agricultural Theme */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Leaf className="text-green-600 mr-2" size={32} />
                        <h1 className="text-3xl font-bold text-gray-800">Farm Orders Dashboard</h1>
                        <Leaf className="text-green-600 ml-2" size={32} />
                    </div>
                    <p className="text-gray-600">Manage your agricultural orders and track deliveries</p>
                </div>

                {/* User Profile Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <User className="mr-2" size={20} />
                                Farmer Profile
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <User className="mr-3 text-green-600" size={20} />
                                        <span className="font-semibold text-gray-700 w-20">Name:</span>
                                        <span className="text-gray-800">{user?.name || user?.fullName || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="mr-3 text-green-600" size={20} />
                                        <span className="font-semibold text-gray-700 w-20">Email:</span>
                                        <span className="text-gray-800">{user?.email || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Phone className="mr-3 text-green-600" size={20} />
                                        <span className="font-semibold text-gray-700 w-20">Contact:</span>
                                        <span className="text-gray-800">{user?.contactNumber || user?.mobile || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Globe className="mr-3 text-green-600" size={20} />
                                        <span className="font-semibold text-gray-700 w-20">Country:</span>
                                        <span className="text-gray-800">{user?.country || 'Sri Lanka'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                            <Package className="mr-2" size={20} />
                            My Agricultural Orders
                        </h2>
                    </div>
                    <div className="p-6">
                        {orders.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="mb-4">
                                    <Package size={64} className="text-gray-400 mx-auto mb-4" />
                                    <Leaf size={32} className="text-green-400 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
                                <p className="text-gray-600 mb-6">Start your farming journey by browsing our marketplace.</p>
                                <a
                                    href="/marketplace"
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 inline-flex items-center"
                                >
                                    <Leaf className="mr-2" size={16} />
                                    Browse Farm Products
                                </a>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-2 gap-6">
                                {orders.map((order) => (
                                    <div key={order._id || order.id} className="bg-gradient-to-br from-white to-green-50 rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    Order #{order.orderNumber || 'N/A'}
                                                </h3>
                                                {getStatusBadge(order.status)}
                                            </div>

                                            {order.items && order.items.length > 0 ? order.items.map((item, index) => (
                                                <div key={index} className="mb-4 pb-4 border-b border-green-100 last:border-b-0">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={item.product?.image || '/placeholder-image.png'}
                                                            alt={item.product?.title || 'Product'}
                                                            className="w-12 h-12 rounded-lg object-cover mr-3 border border-green-200"
                                                            onError={(e) => {
                                                                e.target.src = '/placeholder-image.png';
                                                                e.target.onerror = null;
                                                            }}
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-800">{item.product?.title || 'Product Title'}</h4>
                                                            <p className="text-sm text-gray-600">
                                                                Qty: {item.quantity || 0} × ${item.price || 0}
                                                            </p>
                                                            <p className="text-sm text-green-600">
                                                                Seller: {item.seller?.name || 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-gray-500 mb-4">
                                                    <p>No items found for this order</p>
                                                </div>
                                            )}

                                            <div className="border-t border-green-100 pt-4 mt-4">
                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center">
                                                            <Calendar size={14} className="mr-2 text-green-500" />
                                                            <span>Purchase: {formatDate(order.purchaseDate)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock size={14} className="mr-2 text-blue-500" />
                                                            <span>Delivery: {formatTime(order.deliveryTime)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center">
                                                            <MapPin size={14} className="mr-2 text-red-500" />
                                                            <span className="truncate">{order.deliveryLocation || 'N/A'}</span>
                                                        </div>
                                                        <div className="font-semibold text-gray-800">
                                                            Total: ${order.totalAmount || 0}
                                                        </div>
                                                    </div>
                                                </div>

                                                {order.message && (
                                                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                                        <p className="text-sm text-gray-700">
                                                            <strong>Message:</strong> {order.message}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="mt-4">
                                                    <button
                                                        onClick={() => handleOrderClick(order)}
                                                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200 flex items-center"
                                                    >
                                                        <Truck className="mr-2" size={14} />
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {showOrderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-white">
                                Order Details - #{selectedOrder?.orderNumber}
                            </h2>
                            <button
                                onClick={() => setShowOrderModal(false)}
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            {selectedOrder && (
                                <div>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                                                <Package className="mr-2 text-green-600" size={18} />
                                                Order Information
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-medium">Status:</span> {getStatusBadge(selectedOrder.status)}</p>
                                                <p><span className="font-medium">Purchase Date:</span> {formatDate(selectedOrder.purchaseDate)}</p>
                                                <p><span className="font-medium">Delivery Time:</span> {formatTime(selectedOrder.deliveryTime)}</p>
                                                <p><span className="font-medium">Delivery Location:</span> {selectedOrder.deliveryLocation || 'N/A'}</p>
                                                <p><span className="font-medium">Total Amount:</span> <span className="text-green-600 font-semibold">${selectedOrder.totalAmount || 0}</span></p>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                                                <MapPin className="mr-2 text-blue-600" size={18} />
                                                Shipping Address
                                            </h3>
                                            <div className="space-y-1 text-sm text-gray-700">
                                                <p>{selectedOrder.shippingAddress?.name || 'N/A'}</p>
                                                <p>{selectedOrder.shippingAddress?.address || 'N/A'}</p>
                                                <p>{selectedOrder.shippingAddress?.district || 'N/A'}, {selectedOrder.shippingAddress?.province || 'N/A'}</p>
                                                <p>Phone: {selectedOrder.shippingAddress?.phone || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-6">
                                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                                            <Leaf className="mr-2 text-green-600" size={18} />
                                            Order Items
                                        </h3>
                                        {selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items.map((item, index) => (
                                            <div key={index} className="flex items-center mb-4 p-4 border border-green-100 rounded-lg bg-gradient-to-r from-white to-green-50">
                                                <img
                                                    src={item.product?.image || '/placeholder-image.png'}
                                                    alt={item.product?.title || 'Product'}
                                                    className="w-20 h-20 rounded-lg object-cover mr-4 border border-green-200"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder-image.png';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800 mb-1">{item.product?.title || 'Product Title'}</h4>
                                                    <p className="text-gray-600 text-sm mb-2">{item.product?.description || 'No description available'}</p>
                                                    <p className="text-sm text-gray-700">
                                                        <span className="font-medium">Quantity:</span> {item.quantity || 0} × ${item.price || 0}
                                                    </p>
                                                    <p className="text-sm text-green-600">
                                                        <span className="font-medium">Seller:</span> {item.seller?.name || 'N/A'} ({item.seller?.email || 'N/A'})
                                                    </p>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-gray-500 text-center py-8">
                                                <Package size={48} className="mx-auto text-gray-300 mb-2" />
                                                <p>No items found for this order</p>
                                            </div>
                                        )}

                                        {selectedOrder.message && (
                                            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                                <h4 className="font-semibold text-gray-800 mb-2">Additional Message</h4>
                                                <p className="text-gray-700">{selectedOrder.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
                            <button
                                onClick={() => setShowOrderModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Orders;
