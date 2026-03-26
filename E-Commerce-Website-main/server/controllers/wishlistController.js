const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, products: [] });
    }

    // Add availability status to each product
    const productsWithStatus = wishlist.products.map(product => ({
      ...product.toObject(),
      available: product.stock > 0
    }));

    res.status(200).json({
      success: true,
      data: {
        wishlist: {
          ...wishlist.toObject(),
          products: productsWithStatus
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/add/:productId
// @access  Private
exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate product exists
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Product not found',
          code: 'PRODUCT_NOT_FOUND'
        }
      });
    }

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, products: [] });
    }

    // Check if product already in wishlist
    if (wishlist.products.includes(productId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Product already in wishlist',
          code: 'DUPLICATE_PRODUCT'
        }
      });
    }

    // Add product to wishlist
    wishlist.products.push(productId);
    await wishlist.save();
    await wishlist.populate('products');

    res.status(200).json({
      success: true,
      data: { wishlist }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Wishlist not found',
          code: 'WISHLIST_NOT_FOUND'
        }
      });
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      id => id.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate('products');

    res.status(200).json({
      success: true,
      data: { wishlist }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Move product from wishlist to cart
// @route   POST /api/wishlist/move-to-cart/:productId
// @access  Private
exports.moveToCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { removeFromWishlist = true, quantity = 1, size } = req.body;

    // Validate product exists and has stock
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Product not found',
          code: 'PRODUCT_NOT_FOUND'
        }
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Insufficient stock',
          code: 'INSUFFICIENT_STOCK'
        }
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        size,
        price: product.price
      });
    }

    await cart.save();

    // Remove from wishlist if requested
    if (removeFromWishlist) {
      const wishlist = await Wishlist.findOne({ user: req.user.id });
      if (wishlist) {
        wishlist.products = wishlist.products.filter(
          id => id.toString() !== productId
        );
        await wishlist.save();
      }
    }

    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};
