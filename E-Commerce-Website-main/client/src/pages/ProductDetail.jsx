import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProductById(id);
        setProduct(data.data.product);
        if (data.data.product.sizes && data.data.product.sizes.length > 0) {
          setSelectedSize(data.data.product.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && isAuthenticated) {
      setInWishlist(isInWishlist(product._id));
    }
  }, [product, isAuthenticated, isInWishlist]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }

    try {
      await addToCart(product._id, quantity, selectedSize);
      setSuccessMessage('Added to cart!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      navigate('/login');
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
      console.error('Error toggling wishlist:', error);
      alert('Error updating wishlist');
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleQuantityIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <section className="section-p1">
        <div className="loading-spinner">
          <p>Loading product...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="section-p1">
        <div className="error-message">
          {error || 'Product not found'}
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="page-header">
        <h2>Product Details</h2>
        <p>Get all the information about this product</p>
      </section>

      <section id="prodetails" className="section-p1">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="details-container">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images[0] || '/img/products/f1.jpg'}
                alt={product.name}
                id="MainImg"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="thumbnail"
                    onClick={(e) => {
                      document.getElementById('MainImg').src = e.target.src;
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h6>{product.brand}</h6>
            <h4>{product.name}</h4>

            <div className="product-rating">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
              <span>({product.numReviews || 0} reviews)</span>
            </div>

            <h2>${product.price}</h2>

            <p className="product-description">{product.description}</p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="size-selector">
                <label htmlFor="size">Select Size:</label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="size-select"
                >
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={handleQuantityDecrement}
                  className="qty-btn"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={product.stock}
                  className="qty-input"
                />
                <button
                  onClick={handleQuantityIncrement}
                  className="qty-btn"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <p className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="add-to-cart-btn"
              >
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
              >
                <i className={`fas fa-heart ${inWishlist ? 'filled' : ''}`}></i>
              </button>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <table>
                <tbody>
                  <tr>
                    <td>Brand</td>
                    <td>{product.brand}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>Rating</td>
                    <td>{product.rating} / 5</td>
                  </tr>
                  <tr>
                    <td>Availability</td>
                    <td>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
