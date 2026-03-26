const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createOrder,
  getUserOrders,
  getOrderById
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// Validation rules
const createOrderValidation = [
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.postalCode')
    .trim()
    .notEmpty()
    .withMessage('Postal code is required'),
  body('shippingCost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Shipping cost must be a positive number')
];

// All routes require authentication
router.use(protect);

// Routes
router.post('/', createOrderValidation, validate, createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);

module.exports = router;
