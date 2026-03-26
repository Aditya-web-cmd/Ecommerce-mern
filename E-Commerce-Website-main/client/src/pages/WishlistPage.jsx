import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, loading, removeFromWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRemoveFromWishlist = async (productId) => {
    try {
      setError('');
      await removeFromWishlist(productId);
      setSuccessMessage('Removed from wishlist');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setError('Failed to remove from wishlist');
    }
  };

  const handleMoveToCart = async (product) => {
    try {
      setError('');
      await moveToCart(product._id);
      setSuccessMessage('Moved to cart!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error moving to cart:', error);
      setError('Failed to move to cart');
    }
  };

  return (
    <>
      <section id="page-header">
        <h2>My Wishlist</h2>
        <p>Save your favorite items for later</p>
      </section>

      <section id="wishlist" className="section-p1">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="loading-spinner">
            <p>Loading wishlist...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <h3>Your wishlist is empty</h3>
            <p>Start adding items to your wishlist to save them for later!</p>
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="wishlist-container">
            <div className="wishlist-grid">
              {wishlistItems.map(product => (
                <div key={product._id} className="wishlist-item">
                  <Link to={`/product/${product._id}`} className="product-image-link">
                    <img
                      src={product.images[0] || '/img/products/f1.jpg'}
                      alt={product.name}
                      className="product-image"
                    />
                  </Link>

                  <div className="product-info">
                    <Link to={`/product/${product._id}`} className="product-name-link">
                      <h4>{product.name}</h4>
                    </Link>
                    <p className="product-brand">{product.brand}</p>

                    <div className="product-rating">
                      {[...Array(Math.floor(product.rating))].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>

                    <p className="product-price">${product.price}</p>

                    <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>

                    <div className="product-actions">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        disabled={product.stock === 0}
                        className="move-to-cart-btn"
                      >
                        <i className="fas fa-shopping-cart"></i> Move to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(product._id)}
                        className="remove-btn"
                      >
                        <i className="fas fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default WishlistPage;
