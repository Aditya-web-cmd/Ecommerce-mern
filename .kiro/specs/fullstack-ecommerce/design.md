# Design Document

## Overview

This design document outlines the technical architecture for transforming the existing static Purrchase e-commerce website into a full-stack MERN (MongoDB, Express, React, Node.js) application. The design preserves the existing UI/UX while adding dynamic functionality through a RESTful API backend and React-based frontend.

### Technology Stack

- **Frontend**: React 18, React Router, Axios, existing CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Additional Libraries**: express-validator, cors, dotenv, nodemailer

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           React Application (Port 3000)                │  │
│  │  - Components (Header, ProductList, Cart, etc.)       │  │
│  │  - React Router (Client-side routing)                 │  │
│  │  - Axios (HTTP client)                                │  │
│  │  - Existing style.css                                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Express Backend (Port 5000)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  API Routes                                            │  │
│  │  - /api/auth (login, register, reset)                 │  │
│  │  - /api/products (CRUD, search, filter)               │  │
│  │  - /api/cart (add, update, remove, get)               │  │
│  │  - /api/wishlist (add, remove, get)                   │  │
│  │  - /api/orders (create, get, update)                  │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Middleware                                            │  │
│  │  - Authentication (JWT verification)                   │  │
│  │  - Validation (express-validator)                     │  │
│  │  - Error handling                                     │  │
│  │  - Rate limiting                                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Mongoose
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                          │
│  - users collection                                          │
│  - products collection                                       │
│  - carts collection                                          │
│  - wishlists collection                                      │
│  - orders collection                                         │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
E-Commerce-Website-main/
├── client/                      # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── img/                # Existing images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── Auth/
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── WishlistPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── cartService.js
│   │   │   └── orderService.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── style.css          # Existing CSS
│   └── package.json
│
├── server/                      # Node.js backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   └── orders.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── utils/
│   │   ├── emailService.js
│   │   └── tokenUtils.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Components and Interfaces

### Frontend Components

#### 1. Header Component
- **Purpose**: Navigation bar with cart/wishlist counters
- **Props**: `user`, `cartCount`, `wishlistCount`
- **State**: `mobileMenuOpen`
- **Features**: 
  - Responsive mobile menu (existing functionality)
  - Dynamic cart/wishlist badges
  - Login/Logout button based on auth state

#### 2. ProductCard Component
- **Purpose**: Display individual product with add-to-cart/wishlist buttons
- **Props**: `product`, `onAddToCart`, `onAddToWishlist`
- **Features**:
  - Product image, name, price, rating
  - Add to cart icon
  - Add to wishlist icon (heart)

#### 3. ProductList Component
- **Purpose**: Display grid of products with filters
- **Props**: `products`, `loading`
- **State**: `filters`, `searchQuery`, `sortBy`
- **Features**:
  - Search bar
  - Category filters
  - Price range filters
  - Sort options (price, rating, newest)

#### 4. Cart Component
- **Purpose**: Shopping cart with quantity management
- **State**: `cartItems`, `loading`
- **Features**:
  - Item list with images
  - Quantity increment/decrement
  - Remove item button
  - Subtotal calculation
  - Proceed to checkout button

#### 5. Checkout Component
- **Purpose**: Multi-step checkout form
- **State**: `shippingInfo`, `step`, `orderSummary`
- **Features**:
  - Shipping address form
  - Order summary
  - Payment information (placeholder)
  - Order confirmation

### Context Providers

#### AuthContext
```javascript
{
  user: Object | null,
  token: String | null,
  login: (email, password) => Promise,
  register: (userData) => Promise,
  logout: () => void,
  isAuthenticated: Boolean
}
```

#### CartContext
```javascript
{
  cartItems: Array,
  cartCount: Number,
  addToCart: (productId, quantity, size) => Promise,
  updateQuantity: (itemId, quantity) => Promise,
  removeFromCart: (itemId) => Promise,
  clearCart: () => Promise,
  getCartTotal: () => Number
}
```

### API Service Layer

#### authService.js
```javascript
- register(userData)
- login(email, password)
- logout()
- resetPassword(email)
- verifyToken()
```

#### productService.js
```javascript
- getAllProducts(filters)
- getProductById(id)
- searchProducts(query)
- filterProducts(category, priceRange)
```

#### cartService.js
```javascript
- getCart()
- addToCart(productId, quantity, size)
- updateCartItem(itemId, quantity)
- removeFromCart(itemId)
- clearCart()
```

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `email` (unique)

### Product Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  price: Number (required),
  brand: String,
  category: String (required),
  images: [String],
  sizes: [String],
  stock: Number (default: 0),
  rating: Number (default: 0),
  numReviews: Number (default: 0),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `category`, `brand`, `name` (text index for search)

### Cart Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  items: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number (default: 1),
    size: String,
    price: Number
  }],
  totalPrice: Number,
  updatedAt: Date
}
```

**Indexes**: `user` (unique)

### Wishlist Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  products: [ObjectId] (ref: 'Product'),
  updatedAt: Date
}
```

**Indexes**: `user` (unique)

### Order Model
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  user: ObjectId (ref: 'User', required),
  items: [{
    product: ObjectId (ref: 'Product'),
    name: String,
    quantity: Number,
    size: String,
    price: Number
  }],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  totalPrice: Number,
  shippingCost: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  paymentStatus: String (enum: ['pending', 'completed', 'failed']),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `user`, `orderNumber` (unique), `status`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| POST | `/logout` | Logout user | Yes |
| POST | `/reset-password` | Request password reset | No |
| GET | `/me` | Get current user | Yes |

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products (with filters) | No |
| GET | `/search` | Search products | No |
| GET | `/:id` | Get product by ID | No |
| GET | `/featured` | Get featured products | No |

### Cart Routes (`/api/cart`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's cart | Yes |
| POST | `/add` | Add item to cart | Yes |
| PUT | `/update/:itemId` | Update cart item quantity | Yes |
| DELETE | `/remove/:itemId` | Remove item from cart | Yes |
| DELETE | `/clear` | Clear entire cart | Yes |

### Wishlist Routes (`/api/wishlist`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's wishlist | Yes |
| POST | `/add/:productId` | Add product to wishlist | Yes |
| DELETE | `/remove/:productId` | Remove product from wishlist | Yes |

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create new order | Yes |
| GET | `/` | Get user's orders | Yes |
| GET | `/:id` | Get order by ID | Yes |

## Error Handling

### Error Response Format
```javascript
{
  success: false,
  error: {
    message: String,
    code: String,
    details: Object (optional)
  }
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

### Error Handling Middleware
- Catches all errors from routes and controllers
- Logs errors with timestamp and stack trace
- Returns formatted error response
- Handles MongoDB validation errors
- Handles JWT errors

## Security Measures

### Authentication & Authorization
- JWT tokens stored in httpOnly cookies or localStorage
- Token expiration: 24 hours
- Password hashing with bcrypt (10 salt rounds)
- Protected routes require valid JWT token

### Input Validation
- express-validator for request validation
- Sanitize all user inputs
- Validate email format
- Password strength requirements (min 6 characters)

### Rate Limiting
- 100 requests per 15 minutes per IP
- Separate limits for auth endpoints (5 login attempts per 15 minutes)

### Database Security
- Mongoose schema validation
- NoSQL injection prevention through input sanitization
- Database connection with authentication
- Environment variables for sensitive data

### CORS Configuration
- Allow requests from frontend origin only
- Credentials enabled for cookie-based auth

## Testing Strategy

### Unit Tests
- Model validation tests
- Utility function tests
- Service layer tests

### Integration Tests
- API endpoint tests
- Authentication flow tests
- Cart operations tests
- Order creation tests

### Frontend Tests
- Component rendering tests
- User interaction tests
- Context provider tests

### Test Tools
- Backend: Jest, Supertest
- Frontend: React Testing Library, Jest

## Performance Considerations

### Database Optimization
- Indexes on frequently queried fields
- Populate only necessary fields
- Pagination for product lists (20 items per page)
- Connection pooling

### Frontend Optimization
- Lazy loading for routes
- Image optimization
- Debouncing for search input
- Caching API responses

### API Optimization
- Response compression (gzip)
- Efficient query design
- Avoid N+1 queries with populate
- Cache frequently accessed data

## Deployment Strategy

### Development Environment
- Frontend: `npm start` (Port 3000)
- Backend: `npm run dev` with nodemon (Port 5000)
- MongoDB: Local instance or MongoDB Atlas

### Production Considerations
- Environment variables for configuration
- HTTPS for secure communication
- Separate frontend and backend deployments
- MongoDB Atlas for database hosting
- Static file serving for React build
- Process manager (PM2) for Node.js

## Migration Plan

### Phase 1: Backend Setup
1. Initialize Node.js project with Express
2. Set up MongoDB connection
3. Create data models
4. Implement authentication system
5. Build API endpoints
6. Add middleware and error handling

### Phase 2: Frontend Migration
1. Create React app
2. Copy existing CSS and images
3. Convert HTML pages to React components
4. Implement React Router
5. Create context providers
6. Build service layer for API calls

### Phase 3: Integration
1. Connect frontend to backend APIs
2. Implement authentication flow
3. Add cart and wishlist functionality
4. Build checkout process
5. Test all features end-to-end

### Phase 4: Testing & Deployment
1. Write and run tests
2. Fix bugs and optimize
3. Deploy backend to hosting service
4. Deploy frontend to hosting service
5. Configure production environment
