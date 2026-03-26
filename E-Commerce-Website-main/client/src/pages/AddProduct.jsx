import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateProductDescription } from '../services/descriptionService';
import './AddProduct.css';

const CATEGORIES = ['clothing', 'electronics', 'grocery', 'shoes'];

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingDescription, setGeneratingDescription] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'clothing',
    description: '',
    image: '',
    brand: '',
    stock: '10',
    sizes: ['S', 'M', 'L', 'XL']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.name.trim()) {
      setError('Please enter a product name first');
      return;
    }

    try {
      setGeneratingDescription(true);
      setError('');

      const response = await generateProductDescription(formData.name, formData.category);

      if (response.success) {
        setFormData(prev => ({
          ...prev,
          description: response.data.description
        }));
        setSuccess('Description generated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Failed to generate description');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Error generating description. Please try again.');
    } finally {
      setGeneratingDescription(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setError('Valid price is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.image) {
      setError('Product image is required');
      return;
    }

    try {
      setLoading(true);

      const productData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        category: formData.category,
        description: formData.description.trim(),
        images: [formData.image],
        brand: formData.brand.trim() || 'Generic',
        stock: Number(formData.stock) || 10,
        sizes: formData.sizes,
        rating: 0,
        numReviews: 0,
        featured: false
      };

      const response = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add product');
      }

      setSuccess('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        category: 'clothing',
        description: '',
        image: '',
        brand: '',
        stock: '10',
        sizes: ['S', 'M', 'L', 'XL']
      });
      setImagePreview('');

      // Redirect to shop after 2 seconds
      setTimeout(() => {
        navigate('/shop');
      }, 2000);

    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.message || 'Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <section id="page-header">
        <h2>Add New Product</h2>
        <p>Admin Panel - Add products to your store</p>
      </section>

      <section className="add-product-section">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="add-product-form">
            <h3>Product Details</h3>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Product Name */}
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Enter brand name (optional)"
              />
            </div>

            {/* Stock */}
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                min="0"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">
                Description * 
                <button
                  type="button"
                  className="btn-generate-inline"
                  onClick={handleGenerateDescription}
                  disabled={generatingDescription || !formData.name.trim()}
                  title="Generate description using AI"
                >
                  {generatingDescription ? '⏳ Generating...' : '✨ Generate with AI'}
                </button>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description or use AI to generate one"
                rows="5"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="image">Product Image *</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <p>Image Preview</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate('/shop')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
