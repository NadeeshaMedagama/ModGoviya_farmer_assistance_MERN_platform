import React, {createContext, useContext, useState, useEffect} from 'react';
import api from '../utils/axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState({items: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setCart({ items: [] });
                setError(null);
                return;
            }
            setLoading(true);
            const response = await api.get('/cart');
            setCart(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to add items to your cart');
                window.location.href = '/login';
                return;
            }
            setLoading(true);
            const response = await api.post('/cart', {
                productId,
                quantity
            });
            setCart(response.data);
            toast.success('Item added to cart!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add to cart');
            toast.error('Failed to add item to cart');
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to update your cart');
                window.location.href = '/login';
                return;
            }
            setLoading(true);
            const response = await api.put(`/cart/${itemId}`, {
                quantity,
            });
            setCart(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update cart');
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to modify your cart');
                window.location.href = '/login';
                return;
            }
            setLoading(true);
            const response = await api.delete(`/cart/${itemId}`);
            setCart(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to remove from cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Avoid triggering 401 redirects for anonymous visitors
        const token = localStorage.getItem('token');
        if (token) {
            fetchCart();
        } else {
            setCart({ items: [] });
        }
        // Intentionally not depending on fetchCart to avoid re-runs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                addToCart,
                updateCartItem,
                removeFromCart,
                fetchCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
