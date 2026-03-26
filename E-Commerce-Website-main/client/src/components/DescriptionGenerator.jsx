import { useState } from 'react';
import { generateProductDescription } from '../services/descriptionService';
import './DescriptionGenerator.css';

const CATEGORIES = ['clothing', 'electronics', 'grocery', 'shoes'];

const DescriptionGenerator = ({ onDescriptionGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('clothing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateDescription = async (e) => {
    e.preventDefault();
    setError('');
    setGeneratedDescription('');
    setCopied(false);

    // Validation
    if (!productName.trim()) {
      setError('Please enter a product name');
      return;
    }

    try {
      setLoading(true);

      const response = await generateProductDescription(productName, category);

      if (response.success) {
        setGeneratedDescription(response.data.description);
        
        // Call callback if provided
        if (onDescriptionGenerated) {
          onDescriptionGenerated(response.data.description);
        }
      } else {
        setError(response.message || 'Failed to generate description');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Error generating description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(generatedDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearForm = () => {
    setProductName('');
    setCategory('clothing');
    setGeneratedDescription('');
    setError('');
    setCopied(false);
  };

  return (
    <>
      {/* Generator Button */}
      <button
        className="description-generator-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Generate Product Description"
      >
        ✨
      </button>

      {/* Generator Modal */}
      {isOpen && (
        <div className="description-generator-overlay" onClick={() => setIsOpen(false)}>
          <div className="description-generator-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="generator-header">
              <h3>AI Description Generator</h3>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="generator-content">
              <form onSubmit={handleGenerateDescription} className="generator-form">
                {/* Product Name Input */}
                <div className="form-group">
                  <label htmlFor="productName">Product Name *</label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., Wireless Bluetooth Headphones"
                    disabled={loading}
                  />
                </div>

                {/* Category Select */}
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={loading}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error Message */}
                {error && <div className="alert alert-error">{error}</div>}

                {/* Generate Button */}
                <button
                  type="submit"
                  className="btn-generate"
                  disabled={loading || !productName.trim()}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Generating...
                    </>
                  ) : (
                    <>✨ Generate Description</>
                  )}
                </button>
              </form>

              {/* Generated Description */}
              {generatedDescription && (
                <div className="generated-section">
                  <h4>Generated Description</h4>
                  <div className="description-box">
                    <p>{generatedDescription}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="description-actions">
                    <button
                      className="btn-copy"
                      onClick={handleCopyDescription}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                    <button
                      className="btn-regenerate"
                      onClick={handleGenerateDescription}
                      disabled={loading}
                    >
                      🔄 Regenerate
                    </button>
                    <button
                      className="btn-clear"
                      onClick={handleClearForm}
                    >
                      🗑️ Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DescriptionGenerator;
