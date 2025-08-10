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
        fetchCart();
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
