import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

const token = localStorage.getItem('token');

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState({items: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/cart', {
                productId,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            const response = await axios.put(`http://localhost:5000/api/cart/${itemId}`, {
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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
                const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCart(response.data);
            } catch
                (err) {
                setError(err.response?.data?.message || 'Failed to remove from cart');
            } finally {
                setLoading(false);
            }
        }
    ;

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
