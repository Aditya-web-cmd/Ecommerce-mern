const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {
  createProduct,
  getAllProducts,
  searchProducts,
  getProductById,
  getFeaturedProducts
} = require('../controllers/productController');

// Routes
router.post('/', createProduct);
router.get('/featured', getFeaturedProducts);
router.get('/search', searchProducts);
router.get('/categories/list', async (req, res) => {
  try {
    const categories = ['clothing', 'electronics', 'grocery', 'shoes'];
    res.status(200).json({
      success: true,
      data: { categories }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: err.message
    });
  }
});
router.get('/:id', getProductById);
router.get('/', getAllProducts);

module.exports = router;
