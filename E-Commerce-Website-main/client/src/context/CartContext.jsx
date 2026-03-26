import React, { createContext, useState, useEffect, useContext } from 'react';
import * as cartService from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    try {
      setLoading(true);
      if (isAuthenticated) {
        // Fetch from server if authenticated
        const data = await cartService.getCart();
        setCartItems(data.data.cart.items || []);
      } else {
        // Load from localStorage if not authenticated
        const savedCart = localStorage.getItem('guestCart');
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem('guestCart');
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1, size) => {
    try {
      if (isAuthenticated) {
        const data = await cartService.addToCart(productId, quantity, size);
        setCartItems(data.data.cart.items);
        return data;
      } else {
        // Add to localStorage for guests
        const savedCart = localStorage.getItem('guestCart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        const existingItem = cart.find(item => item.productId === productId && item.size === size);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ productId, quantity, size, _id: Date.now().toString() });
        }
        
        localStorage.setItem('guestCart', JSON.stringify(cart));
        setCartItems(cart);
        return { data: { cart: { items: cart } } };
      }
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (isAuthenticated) {
        const data = await cartService.updateCartItem(itemId, quantity);
        setCartItems(data.data.cart.items);
        return data;
      } else {
        const savedCart = localStorage.getItem('guestCart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        const item = cart.find(i => i._id === itemId);
        if (item) {
          item.quantity = quantity;
        }
        localStorage.setItem('guestCart', JSON.stringify(cart));
        setCartItems(cart);
        return { data: { cart: { items: cart } } };
      }
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (isAuthenticated) {
        const data = await cartService.removeFromCart(itemId);
        setCartItems(data.data.cart.items);
        return data;
      } else {
        const savedCart = localStorage.getItem('guestCart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        const filtered = cart.filter(item => item._id !== itemId);
        localStorage.setItem('guestCart', JSON.stringify(filtered));
        setCartItems(filtered);
        return { data: { cart: { items: filtered } } };
      }
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
      } else {
        localStorage.removeItem('guestCart');
      }
      setCartItems([]);
    } catch (error) {
      throw error;
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    cartCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    refreshCart: fetchCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
