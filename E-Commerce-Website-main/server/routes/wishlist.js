const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// Validation for move to cart
const moveToCartValidation = [
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('size')
    .optional()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
    .withMessage('Invalid size'),
  body('removeFromWishlist')
    .optional()
    .isBoolean()
    .withMessage('removeFromWishlist must be a boolean')
];

// All routes require authentication
router.use(protect);

// Routes
router.get('/', getWishlist);
router.post('/add/:productId', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);
router.post('/move-to-cart/:productId', moveToCartValidation, validate, moveToCart);

module.exports = router;
