import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setInWishlist(isInWishlist(product._id));
    }
  }, [product._id, isAuthenticated, isInWishlist]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await addToCart(product._id, 1);
      alert('Added to cart!');
    } catch (error) {
      alert('Error adding to cart');
    }
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      return;
    }
    try {
      if (inWishlist) {
        await removeFromWishlist(product._id);
        setInWishlist(false);
      } else {
        await addToWishlist(product._id);
        setInWishlist(true);
      }
    } catch (error) {
      alert('Error updating wishlist');
    }
  };

  return (
    <div className="pro">
      <Link to={`/product/${product._id}`}>
        <img src={product.images[0] || '/img/products/f1.jpg'} alt={product.name} />
        <div className="des">
          <span>{product.brand}</span>
          <h5>{product.name}</h5>
          <div className="star">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
          </div>
          <h4>${product.price}</h4>
        </div>
      </Link>
      <div className="product-card-actions">
        <a href="#" onClick={handleAddToCart}><i className="fas fa-shopping-cart cart"></i></a>
        <a href="#" onClick={handleToggleWishlist} className={`wishlist-icon ${inWishlist ? 'active' : ''}`}>
          <i className={`fas fa-heart ${inWishlist ? 'filled' : ''}`}></i>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
