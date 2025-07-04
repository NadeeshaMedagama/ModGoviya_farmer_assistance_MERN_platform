import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, X, Plus, Minus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Cart = () => {
    const { cart, loading, error, updateCartItem, removeFromCart } = useCart();

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        updateCartItem(itemId, newQuantity);
    };

    const calculateTotal = () => {
        return cart.items.reduce(
            (total, item) => total + (item.product.price * item.quantity),
            0
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <ShoppingCart className="w-8 h-8 mr-3 text-green-600" />
                    Your Shopping Cart
                </h1>

                {loading && <div className="text-center py-12">Loading...</div>}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                {cart.items.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            Your cart is empty
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Start shopping to add items to your cart
                        </p>
                        <Link
                            to="/marketplace"
                            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Browse Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                                <div className="divide-y divide-gray-200">
                                    {cart.items.map((item) => (
                                        <div key={item._id} className="p-6">
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.title}
                                                        className="w-32 h-32 object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            {item.product.title}
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item._id)}
                                                            className="text-gray-400 hover:text-red-500"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <p className="text-gray-600 mt-1">
                                                        {item.product.location}
                                                    </p>
                                                    <div className="mt-2 flex items-center">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-sm text-gray-600 ml-1">
                              {item.product.rating}
                            </span>
                                                    </div>
                                                    <div className="mt-4 flex items-center justify-between">
                                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(item._id, item.quantity - 1)
                                                                }
                                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="px-4 py-1 text-gray-900">
                                {item.quantity}
                              </span>
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(item._id, item.quantity + 1)
                                                                }
                                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <span className="text-lg font-bold text-green-600">
                              Rs: {(item.product.price * item.quantity).toLocaleString()}
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-white shadow-sm rounded-xl p-6 sticky top-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">
                                    Order Summary
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">
                      Rs: {calculateTotal().toLocaleString()}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">Rs: 0</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-gray-900">Total</span>
                                            <span className="font-bold text-green-600">
                        Rs: {calculateTotal().toLocaleString()}
                      </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium">
                                    Proceed to Checkout
                                </button>
                                <p className="mt-3 text-sm text-gray-500 text-center">
                                    or{' '}
                                    <Link
                                        to="/marketplace"
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        Continue Shopping
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
