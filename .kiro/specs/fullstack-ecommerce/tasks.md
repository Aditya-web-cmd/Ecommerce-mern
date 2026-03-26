# Implementation Plan

- [x] 1. Backend Setup and Configuration




  - Initialize Node.js project in `server/` directory with Express, Mongoose, and required dependencies
  - Create `.env` file with MongoDB URI, JWT secret, and port configuration
  - Set up MongoDB connection in `config/db.js` with retry logic and error handling





  - Create main `server.js` with Express app, middleware (CORS, JSON parser), and basic error handling
  - _Requirements: 6.2, 8.2, 8.4_

- [x] 2. Implement User Authentication System


  - [ ] 2.1 Create User model with email validation and password hashing
    - Define User schema in `models/User.js` with name, email, password fields
    - Add pre-save hook to hash passwords using bcrypt with 10 salt rounds
    - Create indexes on email field for unique constraint
    - _Requirements: 1.1, 8.1_



  - [ ] 2.2 Build authentication controllers and routes
    - Implement register controller with input validation and duplicate email check
    - Implement login controller with credential verification and JWT token generation (24-hour expiration)
    - Create password reset request controller with email service integration
    - Build authentication routes in `routes/auth.js` for POST /register, /login, /reset-password
    - _Requirements: 1.1, 1.2, 1.4, 1.5_






  - [ ] 2.3 Create JWT authentication middleware
    - Build `middleware/auth.js` to verify JWT tokens from request headers
    - Handle token expiration and invalid token errors
    - Attach user data to request object for protected routes
    - _Requirements: 1.5, 6.3_



  - [ ]* 2.4 Write authentication tests
    - Create unit tests for User model validation
    - Write integration tests for register, login, and protected route access
    - Test JWT token generation and verification


    - _Requirements: 1.1, 1.2, 1.3_

- [x] 3. Build Product Management System





  - [ ] 3.1 Create Product model and seed data
    - Define Product schema in `models/Product.js` with name, price, brand, category, images, stock, rating fields
    - Create text index on name and description for search functionality
    - Add category and brand indexes for filtering
    - Write seed script to populate database with existing product data from static site
    - _Requirements: 2.1, 8.3_



  - [ ] 3.2 Implement product controllers
    - Build getAllProducts controller with pagination (20 items per page), category filter, and price range filter
    - Create searchProducts controller with text search on name, description, brand (2-second response time target)




    - Implement getProductById controller with full product details
    - Add getFeaturedProducts controller for homepage display
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 3.3 Create product routes
    - Set up GET /api/products with query parameters for filters and pagination
    - Add GET /api/products/search with query parameter


    - Create GET /api/products/:id for product details
    - Add GET /api/products/featured for featured products
    - _Requirements: 2.1, 2.2, 2.5_





- [ ] 4. Implement Shopping Cart Functionality
  - [ ] 4.1 Create Cart model and controllers
    - Define Cart schema in `models/Cart.js` with user reference and items array (product, quantity, size, price)
    - Add unique index on user field


    - Build getCart controller to retrieve user's cart with populated product details
    - Implement addToCart controller with stock validation and duplicate item handling
    - Create updateCartItem controller for quantity changes with total recalculation
    - Build removeFromCart and clearCart controllers


    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [ ] 4.2 Create cart routes with authentication
    - Set up GET /api/cart with auth middleware
    - Add POST /api/cart/add with auth and validation middleware
    - Create PUT /api/cart/update/:itemId with auth middleware
    - Add DELETE /api/cart/remove/:itemId and DELETE /api/cart/clear with auth middleware
    - _Requirements: 3.1, 3.2, 3.3, 6.3_





- [ ] 5. Build Wishlist Feature
  - [ ] 5.1 Create Wishlist model and controllers
    - Define Wishlist schema in `models/Wishlist.js` with user reference and products array
    - Add unique index on user field
    - Build getWishlist controller with populated product details and availability status

    - Implement addToWishlist controller with duplicate check

    - Create removeFromWishlist controller
    - Build moveToCart controller that adds to cart and optionally removes from wishlist
    - _Requirements: 4.1, 4.2, 4.3, 4.4_


  - [ ] 5.2 Create wishlist routes
    - Set up GET /api/wishlist with auth middleware
    - Add POST /api/wishlist/add/:productId with auth middleware






    - Create DELETE /api/wishlist/remove/:productId with auth middleware
    - Add POST /api/wishlist/move-to-cart/:productId with auth middleware
    - _Requirements: 4.1, 4.2, 4.3, 4.4_



- [ ] 6. Implement Order and Checkout System
  - [ ] 6.1 Create Order model
    - Define Order schema in `models/Order.js` with orderNumber, user, items, shippingAddress, totalPrice, status, paymentStatus
    - Add indexes on user, orderNumber, and status fields

    - Create pre-save hook to generate unique order number
    - _Requirements: 5.3, 8.3_

  - [ ] 6.2 Build checkout controllers
    - Implement createOrder controller with cart validation, stock check, order creation, cart clearing, and email confirmation
    - Create getUserOrders controller to retrieve user's order history
    - Build getOrderById controller with authorization check
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 6.3 Create order routes
    - Set up POST /api/orders with auth and validation middleware for shipping address
    - Add GET /api/orders with auth middleware
    - Create GET /api/orders/:id with auth middleware
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 6.4 Implement email notification service
    - Create `utils/emailService.js` with nodemailer configuration
    - Build sendOrderConfirmation function with order details template
    - Integrate email service into order creation flow
    - _Requirements: 5.4_

- [ ] 7. Add Middleware and Security Features
  - [ ] 7.1 Implement validation middleware
    - Create `middleware/validation.js` with express-validator schemas for all endpoints
    - Add validation for registration (email format, password length), login, cart operations, and checkout
    - Build validation error handler to return formatted error responses
    - _Requirements: 6.2, 8.5_

  - [ ] 7.2 Build rate limiting middleware
    - Create `middleware/rateLimiter.js` with express-rate-limit
    - Set general rate limit to 100 requests per 15 minutes per IP
    - Add stricter rate limit for auth endpoints (5 login attempts per 15 minutes)
    - _Requirements: 6.4_

  - [ ] 7.3 Create error handling middleware
    - Build `middleware/errorHandler.js` to catch all errors
    - Format error responses with message, code, and optional details
    - Handle MongoDB validation errors, JWT errors, and duplicate key errors
    - Add error logging with timestamp, endpoint, and stack trace
    - _Requirements: 6.5_

- [ ] 8. Frontend React Application Setup
  - [ ] 8.1 Initialize React project and structure
    - Create React app in `client/` directory using Create React App
    - Copy existing `style.css` and `img/` folder to `client/src/` and `client/public/`
    - Install dependencies: react-router-dom, axios, react-icons
    - Set up proxy to backend API in package.json
    - _Requirements: 7.1_

  - [ ] 8.2 Create context providers
    - Build AuthContext in `context/AuthContext.jsx` with login, register, logout functions and user state
    - Create CartContext in `context/CartContext.jsx` with cart operations and cart count state
    - Implement token storage in localStorage and automatic token verification on app load
    - _Requirements: 1.5, 3.4, 3.5_

  - [ ] 8.3 Build API service layer
    - Create `services/api.js` with axios instance and interceptors for auth token
    - Implement authService.js with register, login, logout, resetPassword functions
    - Build productService.js with getAllProducts, searchProducts, getProductById functions
    - Create cartService.js with getCart, addToCart, updateCartItem, removeFromCart functions
    - Add orderService.js with createOrder, getUserOrders, getOrderById functions
    - _Requirements: 6.1, 7.4, 7.5_

- [ ] 9. Build Core React Components
  - [x] 9.1 Create Header component
    - Convert existing header HTML to Header.jsx component
    - Add dynamic cart and wishlist count badges using context
    - Implement mobile menu toggle functionality (existing script.js logic)
    - Add conditional rendering for login/logout button based on auth state
    - Integrate React Router Link components for navigation
    - _Requirements: 3.4, 4.5, 7.1, 7.3_

  - [x] 9.2 Build ProductCard component
    - Create ProductCard.jsx with product image, name, brand, price, and rating display
    - Add add-to-cart button with loading state and success feedback
    - Implement add-to-wishlist button (heart icon) with toggle state
    - Handle authentication check before cart/wishlist actions
    - _Requirements: 2.1, 3.1, 4.1_

  - [x] 9.3 Create ProductList component
    - Build ProductList.jsx with grid layout matching existing design
    - Implement search input with debouncing (500ms delay)
    - Add category filter dropdown
    - Create price range filter with min/max inputs
    - Add sort options (price low-high, high-low, rating)
    - Display loading spinner during API calls
    - _Requirements: 2.2, 2.3, 2.4, 7.4_

- [ ] 10. Build Authentication Pages
  - [ ] 10.1 Create Login and Register components
    - Build Login.jsx with email and password form
    - Create Register.jsx with name, email, and password form
    - Add form validation with error messages
    - Implement loading states during API calls
    - Add redirect to home page after successful authentication
    - Display error messages for failed authentication
    - _Requirements: 1.1, 1.2, 1.3, 7.5_

  - [ ]* 10.2 Add password reset functionality
    - Create PasswordReset.jsx component with email input form
    - Implement reset request with success message
    - Add reset confirmation page (optional)
    - _Requirements: 1.4_

- [ ] 11. Build Shopping Cart Page
  - [ ] 11.1 Create Cart component
    - Convert existing cart.html to CartPage.jsx
    - Display cart items in table format with product image, name, price, quantity
    - Implement quantity increment/decrement buttons with API calls
    - Add remove item button with confirmation
    - Calculate and display subtotal, shipping, and total
    - Add "Proceed to Checkout" button
    - Show empty cart message when no items
    - _Requirements: 3.2, 3.3, 3.5_

  - [ ] 11.2 Add coupon code functionality (optional)
    - Create coupon input field in cart page
    - Add apply coupon button
    - Display discount amount when coupon is valid
    - _Requirements: 3.2_

- [ ] 12. Build Wishlist Page
  - [x] 12.1 Create Wishlist component
    - Build WishlistPage.jsx with grid layout of saved products
    - Display product cards with current price and availability status
    - Add remove from wishlist button
    - Implement move-to-cart button for each product
    - Show empty wishlist message when no items
    - Display wishlist count in header
    - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [ ] 13. Implement Checkout Flow
  - [ ] 13.1 Create Checkout component
    - Build CheckoutPage.jsx with multi-step form (shipping, review, confirmation)
    - Create shipping address form with validation (street, city, state, postal code)
    - Display order summary with itemized list, subtotal, shipping cost, and total
    - Add place order button with loading state
    - Implement order confirmation page with order number and details
    - Clear cart after successful order
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 13.2 Add payment integration placeholder
    - Create payment information form section
    - Add placeholder for payment gateway integration (Stripe/PayPal)
    - Display payment status in order confirmation
    - _Requirements: 5.3_

- [ ] 14. Build Product Detail Page
  - [x] 14.1 Create ProductDetail component
    - Convert existing sproduct.html to ProductDetail.jsx
    - Display large product image with thumbnail gallery
    - Show product name, brand, price, rating, and description
    - Add size selector dropdown
    - Implement quantity input
    - Create add-to-cart button with selected size and quantity
    - Add add-to-wishlist button
    - _Requirements: 2.5, 3.1, 4.1_

- [ ] 15. Migrate Static Pages to React
  - [ ] 15.1 Convert Home page
    - Create Home.jsx with Hero, Features, and Featured Products sections
    - Fetch featured products from API
    - Maintain existing layout and styling
    - _Requirements: 7.1_

  - [ ] 15.2 Convert Shop page
    - Create Shop.jsx with ProductList component
    - Add page header with banner
    - Implement pagination for product list
    - _Requirements: 2.1, 7.1_

  - [ ] 15.3 Convert Blog, About, and Contact pages
    - Create Blog.jsx, About.jsx, and Contact.jsx components
    - Migrate existing HTML content to JSX
    - Maintain existing styling and layout
    - _Requirements: 7.1_

- [ ] 16. Implement Routing and Navigation
  - [x] 16.1 Set up React Router
    - Configure BrowserRouter in App.jsx
    - Define routes for all pages (Home, Shop, ProductDetail, Cart, Wishlist, Checkout, Login, Register, Blog, About, Contact)
    - Add protected routes for Cart, Wishlist, and Checkout requiring authentication
    - Implement redirect to login for unauthenticated users accessing protected routes
    - _Requirements: 7.2_

  - [ ] 16.2 Add loading and error states
    - Create LoadingSpinner component
    - Build ErrorMessage component with retry button
    - Implement loading states for all API calls
    - Add error handling with user-friendly messages
    - _Requirements: 7.4, 7.5_

- [ ] 17. Testing and Quality Assurance
  - [ ]* 17.1 Write backend API tests
    - Create integration tests for all API endpoints
    - Test authentication flow (register, login, protected routes)
    - Test product CRUD operations and search
    - Test cart operations (add, update, remove)
    - Test order creation and retrieval
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 17.2 Write frontend component tests
    - Create unit tests for key components (Header, ProductCard, Cart)
    - Test context providers (AuthContext, CartContext)
    - Test user interactions (add to cart, login, checkout)
    - _Requirements: 7.1, 7.2_

  - [ ] 17.3 Perform end-to-end testing
    - Test complete user flows (browse → add to cart → checkout)
    - Test authentication flow (register → login → logout)
    - Test wishlist functionality
    - Verify responsive design on mobile, tablet, and desktop
    - Test error scenarios and edge cases
    - _Requirements: All_

- [ ] 18. Final Integration and Deployment Preparation
  - [ ] 18.1 Connect frontend and backend
    - Configure CORS to allow frontend origin
    - Test all API integrations
    - Verify authentication flow works end-to-end
    - Ensure cart and wishlist sync properly
    - _Requirements: 6.1, 7.2_

  - [ ] 18.2 Optimize and polish
    - Add loading states and transitions
    - Optimize images for web
    - Implement lazy loading for routes
    - Add meta tags for SEO
    - Test performance and optimize slow queries
    - _Requirements: 7.1, 7.4_

  - [ ]* 18.3 Prepare for deployment
    - Create production build of React app
    - Set up environment variables for production
    - Configure backend to serve React build
    - Write deployment documentation
    - _Requirements: 6.1, 8.2_
