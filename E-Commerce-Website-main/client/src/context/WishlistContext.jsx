import { createContext, useState, useEffect, useContext } from 'react';
import * as wishlistService from '../services/wishlistService';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }

    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      setWishlistItems(data.data.wishlist?.products || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const addToWishlist = async (productId) => {
    try {
      const data = await wishlistService.addToWishlist(productId);
      setWishlistItems(data.data.wishlist?.products || []);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const data = await wishlistService.removeFromWishlist(productId);
      setWishlistItems(data.data.wishlist?.products || []);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const moveToCart = async (productId) => {
    try {
      const data = await wishlistService.moveToCart(productId);
      // Update wishlist after moving to cart
      setWishlistItems(data.data.wishlist?.products || []);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const wishlistCount = wishlistItems.length;

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const value = {
    wishlistItems,
    wishlistCount,
    loading,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist,
    refreshWishlist: fetchWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistContext;
