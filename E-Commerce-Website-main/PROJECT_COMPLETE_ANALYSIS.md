# Purrchase E-Commerce — Complete Project Analysis

---

## 1. Project Overview

Purrchase is a full-stack MERN e-commerce web application. Users can browse products, add them to cart/wishlist, place orders, and chat with an AI assistant. The backend is a REST API built with Express.js and MongoDB Atlas, and the frontend is a React SPA with React Router and Context API for state management.

---

## 2. Tech Stack

**Frontend:**
- React 18 (Create React App)
- React Router DOM v6 (client-side routing)
- Axios (HTTP requests)
- Context API (AuthContext, CartContext, WishlistContext)
- CSS (custom stylesheets, no UI library)

**Backend:**
- Node.js + Express.js
- Mongoose ODM (MongoDB interaction)
- JSON Web Token (jsonwebtoken) for authentication
- bcryptjs for password hashing
- express-validator for input validation
- express-rate-limit for rate limiting
- OpenAI SDK (GPT-4o-mini) for AI chatbot and description generator
- cors, dotenv

**Database:**
- MongoDB Atlas (cloud-hosted)
- 5 collections: users, products, carts, wishlists, orders

**Tools:**
- Postman (API testing)
- npm (package manager)
- MongoDB Atlas (cloud DB)
- Git

---

## 3. Features (Actually Implemented)

- User registration and login with JWT
- Password hashing with bcrypt (salt rounds: 10)
- Protected routes (cart, wishlist, checkout, add product)
- Product listing with category filter (clothing, electronics, grocery, shoes)
- Product search (MongoDB text index on name + description)
- Featured products section
- Add new product (admin page, any logged-in user can access)
- Shopping cart (add, update quantity, remove, clear)
- Guest cart using localStorage (for non-logged-in users)
- Wishlist (add, remove, move to cart)
- Order placement from cart (auto stock deduction)
- Order history with pagination
- AI Chatbot (OpenAI GPT-4o-mini) with product filtering from MongoDB
- AI Product Description Generator (OpenAI GPT-4o-mini)
- Rate limiting (general: 100/15min, auth: 5/15min)
- Input validation using express-validator
- Auto token injection via Axios interceptor
- Auto redirect to /login on 401 response
- Mobile responsive header with hamburger menu


---

## 4. Folder Structure

### Frontend (`client/src/`)

| Folder/File | Purpose |
|---|---|
| `App.jsx` | Main component, defines all routes, wraps providers (Auth, Cart, Wishlist) |
| `components/Header.jsx` | Navigation bar with cart count, wishlist count, login/logout |
| `components/Auth/Login.jsx` | Login form |
| `components/Auth/Register.jsx` | Registration form |
| `components/Chatbot.jsx` | Floating AI chatbot UI |
| `components/DescriptionGenerator.jsx` | AI description generator UI |
| `components/ProductCard.jsx` | Reusable product card component |
| `context/AuthContext.jsx` | Auth state (user, token, login, register, logout) |
| `context/CartContext.jsx` | Cart state (items, add, remove, update, clear, guest cart) |
| `context/WishlistContext.jsx` | Wishlist state (items, add, remove, move to cart) |
| `services/api.js` | Axios instance with base URL `/api`, token interceptor, 401 handler |
| `services/authService.js` | API calls: register, login, logout, getMe, resetPassword |
| `services/cartService.js` | API calls: getCart, addToCart, updateCartItem, removeFromCart, clearCart |
| `services/productService.js` | API calls: getAllProducts, searchProducts, getProductById, getFeaturedProducts |
| `services/orderService.js` | API calls: createOrder, getUserOrders, getOrderById |
| `services/wishlistService.js` | API calls: getWishlist, addToWishlist, removeFromWishlist, moveToCart |
| `services/chatService.js` | API call: sendMessage to chatbot |
| `pages/Home.jsx` | Homepage with featured products |
| `pages/Shop.jsx` | Product listing with category filter dropdown |
| `pages/ProductDetail.jsx` | Single product detail page |
| `pages/CartPage.jsx` | Cart page |
| `pages/WishlistPage.jsx` | Wishlist page |
| `pages/CheckoutPage.jsx` | Checkout with shipping address form |
| `pages/AddProduct.jsx` | Admin form to add new product (with AI description button) |
| `pages/Blog.jsx` | Static blog listing |
| `pages/BlogDetail.jsx` | Static blog detail |
| `pages/About.jsx` | About page |
| `pages/Contact.jsx` | Contact page |

### Backend (`server/`)

| Folder/File | Purpose |
|---|---|
| `server.js` | Entry point — connects DB, sets up middleware, registers all routes |
| `config/db.js` | MongoDB connection with 3 retries and exponential backoff |
| `controllers/authController.js` | register, login, getMe, logout, resetPassword |
| `controllers/productController.js` | createProduct, getAllProducts, searchProducts, getProductById, getFeaturedProducts |
| `controllers/cartController.js` | getCart, addToCart, updateCartItem, removeFromCart, clearCart |
| `controllers/wishlistController.js` | getWishlist, addToWishlist, removeFromWishlist, moveToCart |
| `controllers/orderController.js` | createOrder, getUserOrders, getOrderById |
| `controllers/chatController.js` | sendMessage (AI chatbot with product filtering) |
| `controllers/descriptionController.js` | generateDescription (AI product description) |
| `models/User.js` | User schema (name, email, password, isAdmin) |
| `models/Product.js` | Product schema (name, price, category, stock, rating, etc.) |
| `models/Cart.js` | Cart schema (user ref, items array with product ref) |
| `models/Wishlist.js` | Wishlist schema (user ref, products array) |
| `models/Order.js` | Order schema (user ref, items, shippingAddress, status, etc.) |
| `routes/auth.js` | Auth routes with validation rules |
| `routes/products.js` | Product routes + categories/list endpoint |
| `routes/cart.js` | Cart routes (all protected) |
| `routes/wishlist.js` | Wishlist routes (all protected) |
| `routes/orders.js` | Order routes (all protected) |
| `routes/chat.js` | Chat route (public) |
| `routes/description.js` | Description generator route (public) |
| `middleware/auth.js` | JWT verification middleware (protect) |
| `middleware/rateLimiter.js` | Rate limiters (general + auth) |
| `middleware/validation.js` | express-validator error handler |
| `utils/tokenUtils.js` | generateToken, verifyToken helpers |
| `seedDatabase.js` | Script to seed 30 sample products |


---

## 5. API Details

### Auth APIs

| # | Endpoint | Method | Request Body | Response | Purpose |
|---|---|---|---|---|---|
| 1 | `/api/auth/register` | POST | `{ name, email, password }` | `{ success, data: { token, user: { id, name, email } } }` | Register new user |
| 2 | `/api/auth/login` | POST | `{ email, password }` | `{ success, data: { token, user: { id, name, email } } }` | Login user, get JWT |
| 3 | `/api/auth/me` | GET | — (Bearer token in header) | `{ success, data: { user: { id, name, email, createdAt } } }` | Get current logged-in user |
| 4 | `/api/auth/logout` | POST | — (Bearer token in header) | `{ success, data: { message } }` | Logout (server just returns success, client removes token) |
| 5 | `/api/auth/reset-password` | POST | `{ email }` | `{ success, data: { message } }` | Request password reset (placeholder, no email sent) |

### Product APIs

| # | Endpoint | Method | Request Body / Query | Response | Purpose |
|---|---|---|---|---|---|
| 6 | `/api/products` | GET | Query: `?category=clothing&minPrice=100&maxPrice=500&page=1&limit=20&sort=-createdAt` | `{ success, data: { products[], pagination } }` | Get all products with filters |
| 7 | `/api/products/featured` | GET | Query: `?limit=8` | `{ success, data: { products[] } }` | Get featured products |
| 8 | `/api/products/search` | GET | Query: `?q=shirt&page=1` | `{ success, data: { products[], pagination } }` | Text search on name + description |
| 9 | `/api/products/categories/list` | GET | — | `{ success, data: { categories: ['clothing','electronics','grocery','shoes'] } }` | Get all category names |
| 10 | `/api/products/:id` | GET | — | `{ success, data: { product } }` | Get single product by ID |
| 11 | `/api/products` | POST | `{ name, price, category, description, images[], brand, stock, sizes[], featured }` | `{ success, data: { product } }` | Create new product |

### Cart APIs (All require Bearer token)

| # | Endpoint | Method | Request Body | Response | Purpose |
|---|---|---|---|---|---|
| 12 | `/api/cart` | GET | — | `{ success, data: { cart } }` | Get user's cart |
| 13 | `/api/cart/add` | POST | `{ productId, quantity, size }` | `{ success, data: { cart } }` | Add item to cart |
| 14 | `/api/cart/update/:itemId` | PUT | `{ quantity }` | `{ success, data: { cart } }` | Update item quantity |
| 15 | `/api/cart/remove/:itemId` | DELETE | — | `{ success, data: { cart } }` | Remove item from cart |
| 16 | `/api/cart/clear` | DELETE | — | `{ success, data: { cart } }` | Clear entire cart |

### Wishlist APIs (All require Bearer token)

| # | Endpoint | Method | Request Body | Response | Purpose |
|---|---|---|---|---|---|
| 17 | `/api/wishlist` | GET | — | `{ success, data: { wishlist } }` | Get user's wishlist |
| 18 | `/api/wishlist/add/:productId` | POST | — | `{ success, data: { wishlist } }` | Add product to wishlist |
| 19 | `/api/wishlist/remove/:productId` | DELETE | — | `{ success, data: { wishlist } }` | Remove product from wishlist |
| 20 | `/api/wishlist/move-to-cart/:productId` | POST | `{ quantity, size, removeFromWishlist }` | `{ success, data: { cart } }` | Move product from wishlist to cart |

### Order APIs (All require Bearer token)

| # | Endpoint | Method | Request Body | Response | Purpose |
|---|---|---|---|---|---|
| 21 | `/api/orders` | POST | `{ shippingAddress: { street, city, state, postalCode }, shippingCost }` | `{ success, data: { order } }` | Create order from cart |
| 22 | `/api/orders` | GET | Query: `?page=1&limit=10` | `{ success, data: { orders[], pagination } }` | Get user's order history |
| 23 | `/api/orders/:id` | GET | — | `{ success, data: { order } }` | Get single order by ID |

### AI APIs (Public)

| # | Endpoint | Method | Request Body | Response | Purpose |
|---|---|---|---|---|---|
| 24 | `/api/chat` | POST | `{ message }` | `{ success, data: { userMessage, botMessage, productsFound, products[] } }` | AI chatbot with product suggestions |
| 25 | `/api/generate-description` | POST | `{ productName, category }` | `{ success, data: { productName, category, description, generatedAt } }` | AI product description generator |


---

## 6. Authentication Flow (Step by Step)

### Registration Flow:
1. User fills name, email, password on `/register` page
2. Frontend calls `POST /api/auth/register` via `authService.register()`
3. Route passes through `authLimiter` (5 req/15min) → `registerValidation` (express-validator) → `validate` middleware
4. Controller checks if email already exists in DB (`User.findOne({ email })`)
5. If exists → returns 409 (USER_EXISTS)
6. If new → `User.create()` triggers `pre('save')` hook → bcrypt hashes password with salt(10)
7. `generateToken(user._id)` creates JWT with payload `{ id: userId }`, expires in 24h
8. Returns `{ token, user: { id, name, email } }`
9. Frontend `AuthContext.register()` saves token to `localStorage` and sets user state
10. User is now logged in

### Login Flow:
1. User enters email + password on `/login` page
2. Frontend calls `POST /api/auth/login`
3. Route passes through `authLimiter` → `loginValidation` → `validate`
4. Controller finds user with `.select('+password')` (password is hidden by default)
5. If no user → returns 401 (INVALID_CREDENTIALS)
6. Calls `user.comparePassword()` → `bcrypt.compare(candidatePassword, hashedPassword)`
7. If wrong → returns 401
8. If correct → generates JWT token → returns token + user data
9. Frontend saves token to localStorage, sets user + token in AuthContext
10. All future API calls include `Authorization: Bearer <token>` via Axios interceptor

### Token Verification (on page refresh):
1. `AuthContext` useEffect runs on mount
2. Reads token from `localStorage`
3. Calls `GET /api/auth/me` with token in header
4. `protect` middleware extracts token → `jwt.verify()` → finds user by decoded ID
5. If valid → sets `req.user` → controller returns user data
6. If expired/invalid → returns 401 → frontend removes token, redirects to login

### Logout Flow:
1. User clicks Logout button in Header
2. `AuthContext.logout()` runs
3. Sets user = null, token = null
4. Removes 'token' and 'user' from localStorage
5. (Server-side logout just returns success message — token invalidation is client-side only)


---

## 7. Database Design

### Collection: `users`

| Field | Type | Required | Notes |
|---|---|---|---|
| _id | ObjectId | auto | MongoDB auto-generated |
| name | String | Yes | max 50 chars, trimmed |
| email | String | Yes | unique index, lowercase, regex validated |
| password | String | Yes | min 6 chars, `select: false` (hidden by default), bcrypt hashed |
| isAdmin | Boolean | No | default: false |
| createdAt | Date | No | default: Date.now |
| updatedAt | Date | No | auto-updated on save |

**Hooks:** `pre('save')` — hashes password if modified, updates `updatedAt`
**Methods:** `comparePassword(candidatePassword)` — bcrypt.compare

---

### Collection: `products`

| Field | Type | Required | Notes |
|---|---|---|---|
| _id | ObjectId | auto | |
| name | String | Yes | max 100 chars |
| description | String | No | max 2000 chars |
| price | Number | Yes | min: 0 |
| brand | String | No | |
| category | String | Yes | enum: clothing, electronics, grocery, shoes |
| images | [String] | No | array of image URLs |
| sizes | [String] | No | enum: XS, S, M, L, XL, XXL |
| stock | Number | No | default: 0, min: 0 |
| rating | Number | No | default: 0, range: 0-5 |
| numReviews | Number | No | default: 0 |
| featured | Boolean | No | default: false |
| createdAt | Date | No | default: Date.now |
| updatedAt | Date | No | auto-updated on save |

**Indexes:** `{ category: 1 }`, `{ brand: 1 }`, `{ name: 'text', description: 'text' }` (for text search)

---

### Collection: `carts`

| Field | Type | Required | Notes |
|---|---|---|---|
| _id | ObjectId | auto | |
| user | ObjectId (ref: User) | Yes | unique index — one cart per user |
| items | Array | No | |
| items[].product | ObjectId (ref: Product) | Yes | |
| items[].quantity | Number | Yes | min: 1, default: 1 |
| items[].size | String | No | enum: XS, S, M, L, XL, XXL |
| items[].price | Number | Yes | stored at time of adding |
| totalPrice | Number | No | auto-calculated in pre('save') hook |
| updatedAt | Date | No | auto-updated on save |

**Hooks:** `pre('save')` — calculates `totalPrice = sum(item.price * item.quantity)`

---

### Collection: `wishlists`

| Field | Type | Required | Notes |
|---|---|---|---|
| _id | ObjectId | auto | |
| user | ObjectId (ref: User) | Yes | unique index — one wishlist per user |
| products | [ObjectId] (ref: Product) | No | array of product references |
| updatedAt | Date | No | auto-updated on save |

---

### Collection: `orders`

| Field | Type | Required | Notes |
|---|---|---|---|
| _id | ObjectId | auto | |
| orderNumber | String | No | auto-generated: `ORD-<timestamp36>-<random>`, unique + sparse |
| user | ObjectId (ref: User) | Yes | |
| items | Array | Yes | |
| items[].product | ObjectId (ref: Product) | No | |
| items[].name | String | Yes | product name snapshot |
| items[].quantity | Number | Yes | min: 1 |
| items[].size | String | No | |
| items[].price | Number | Yes | price snapshot |
| shippingAddress.street | String | Yes | |
| shippingAddress.city | String | Yes | |
| shippingAddress.state | String | Yes | |
| shippingAddress.postalCode | String | Yes | |
| shippingAddress.country | String | Yes | default: 'USA' |
| totalPrice | Number | Yes | cart total + shipping |
| shippingCost | Number | No | default: 0 |
| status | String | No | enum: pending, processing, shipped, delivered, cancelled. Default: pending |
| paymentStatus | String | No | enum: pending, completed, failed. Default: pending |
| paymentId | String | No | for payment gateway reference |
| statusHistory | Array | No | tracks status changes with timestamps |
| createdAt | Date | No | default: Date.now |
| updatedAt | Date | No | auto-updated on save |

**Indexes:** `{ user: 1 }`, `{ status: 1 }`
**Hooks:** `pre('save')` — auto-generates orderNumber if missing

---

### Relations Between Collections

```
users (1) ──── (1) carts        → One user has one cart
users (1) ──── (1) wishlists    → One user has one wishlist
users (1) ──── (N) orders       → One user has many orders
products (1) ── (N) carts.items → One product can be in many carts
products (1) ── (N) wishlists   → One product can be in many wishlists
products (1) ── (N) orders.items → One product can be in many orders
```

### Sample Data Example

**User:**
```json
{
  "_id": "665a1b2c3d4e5f6a7b8c9d0e",
  "name": "John",
  "email": "john@example.com",
  "password": "$2a$10$hashedPasswordHere...",
  "isAdmin": false,
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

**Product:**
```json
{
  "_id": "665b2c3d4e5f6a7b8c9d0e1f",
  "name": "Classic Cotton T-Shirt",
  "description": "Premium cotton t-shirt...",
  "price": 599,
  "brand": "StyleCraft",
  "category": "clothing",
  "images": ["/img/products/f1.jpg"],
  "sizes": ["S", "M", "L", "XL"],
  "stock": 50,
  "rating": 4.2,
  "featured": true
}
```

**Cart:**
```json
{
  "_id": "665c3d4e5f6a7b8c9d0e1f2a",
  "user": "665a1b2c3d4e5f6a7b8c9d0e",
  "items": [
    {
      "product": "665b2c3d4e5f6a7b8c9d0e1f",
      "quantity": 2,
      "size": "M",
      "price": 599
    }
  ],
  "totalPrice": 1198
}
```

**Order:**
```json
{
  "orderNumber": "ORD-M5K2X9-A3B7C",
  "user": "665a1b2c3d4e5f6a7b8c9d0e",
  "items": [
    { "product": "665b...", "name": "Classic Cotton T-Shirt", "quantity": 2, "size": "M", "price": 599 }
  ],
  "shippingAddress": { "street": "123 Main St", "city": "New York", "state": "NY", "postalCode": "10001", "country": "USA" },
  "totalPrice": 1208,
  "shippingCost": 10,
  "status": "pending",
  "paymentStatus": "pending"
}
```


---

## 8. Data Flow (Step by Step)

### Example: User Adds Product to Cart

```
1. User clicks "Add to Cart" on ProductDetail page
   ↓
2. React calls CartContext.addToCart(productId, quantity, size)
   ↓
3. CartContext checks: is user authenticated?
   ├── YES → calls cartService.addToCart(productId, quantity, size)
   │         ↓
   │   4. cartService sends POST /api/cart/add via Axios
   │         ↓
   │   5. Axios interceptor adds "Authorization: Bearer <token>" header
   │         ↓
   │   6. Express receives request → protect middleware runs
   │      → extracts token → jwt.verify() → finds user → sets req.user
   │         ↓
   │   7. Validation middleware checks productId is valid MongoId, quantity >= 1
   │         ↓
   │   8. cartController.addToCart() runs:
   │      a. Product.findById(productId) → checks product exists
   │      b. Checks product.stock >= quantity
   │      c. Cart.findOne({ user: req.user.id }) → finds or creates cart
   │      d. Checks if same product+size already in cart
   │         ├── YES → increases quantity
   │         └── NO → pushes new item { product, quantity, size, price }
   │      e. cart.save() → pre('save') hook calculates totalPrice
   │      f. cart.populate('items.product') → fills product details
   │         ↓
   │   9. Returns { success: true, data: { cart } }
   │         ↓
   │   10. CartContext updates cartItems state → UI re-renders
   │
   └── NO (guest) → saves to localStorage as guestCart
```

### Example: User Places Order

```
1. User fills shipping address on CheckoutPage → clicks Place Order
   ↓
2. Frontend calls POST /api/orders with { shippingAddress, shippingCost }
   ↓
3. protect middleware verifies JWT token
   ↓
4. Validation middleware checks all address fields present
   ↓
5. orderController.createOrder() runs:
   a. Cart.findOne({ user }).populate('items.product') → gets cart with product details
   b. Checks cart is not empty
   c. Validates stock for EVERY item in cart
   d. Creates orderItems array (snapshots product name + price)
   e. Calculates totalPrice = cart.totalPrice + shippingCost
   f. Order.create() → pre('save') hook generates orderNumber
   g. For each item: Product.findByIdAndUpdate → $inc: { stock: -quantity }
   h. Clears cart: cart.items = [] → cart.save()
   i. order.populate('items.product')
   ↓
6. Returns { success: true, data: { order } }
   ↓
7. Frontend shows order confirmation
```

### Example: AI Chatbot Message

```
1. User types "show me shoes under 2000" in chatbot
   ↓
2. Frontend calls POST /api/chat with { message }
   ↓
3. chatController.sendMessage() runs:
   a. extractKeywords("show me shoes under 2000")
      → categories: ['shoes'], priceRange: { max: 2000 }, searchTerms: ['shoes']
   b. filterProducts(keywords)
      → Product.find({ category: { $in: ['shoes'] }, price: { $lte: 2000 } }).limit(5)
   c. formatProductsForAI(products) → creates text with product names, prices, ratings
   d. Builds system prompt with product context
   e. Calls OpenAI GPT-4o-mini with system prompt + user message
   ↓
4. Returns { botMessage, productsFound: 3, products: [...] }
   ↓
5. Chatbot UI displays AI response with product suggestions
```


---

## 9. Core Logic

### Cart Logic

**Add to Cart:**
```
1. Find product by ID → check it exists
2. Check product.stock >= requested quantity
3. Find user's cart (or create new one)
4. Check if same product + same size already in cart
   - YES → increase quantity, re-check stock
   - NO → push new item with { product, quantity, size, price }
5. cart.save() → pre('save') hook auto-calculates totalPrice
6. Populate product details → return full cart
```

**Update Quantity:**
```
1. Find user's cart
2. Find specific item by itemId using cart.items.id(itemId)
3. Check product stock >= new quantity
4. Update item.quantity = new quantity
5. Save → totalPrice recalculated
```

**Remove from Cart:**
```
1. Find user's cart
2. Filter out the item: cart.items.filter(item => item._id !== itemId)
3. Save → totalPrice recalculated
```

**Guest Cart (not logged in):**
```
- Uses localStorage key 'guestCart'
- Stores array of { productId, quantity, size, _id }
- CartContext checks isAuthenticated to decide: server API or localStorage
- No stock validation for guest cart (only validated when placing order)
```

### Login Logic

```
1. Receive email + password
2. Find user by email with .select('+password') — because password field has select:false
3. If no user found → return "Invalid credentials" (don't reveal if email exists)
4. Call user.comparePassword(password) → bcrypt.compare()
5. If wrong password → return "Invalid credentials"
6. If correct → generateToken(user._id) → jwt.sign({ id }, secret, { expiresIn: '24h' })
7. Return token + user data (without password)
```

### Order Logic

```
1. Get user's cart with populated products
2. Check cart is not empty
3. For each cart item:
   - Check product still exists
   - Check product.stock >= item.quantity
4. Create order items array (snapshot name + price from product)
5. Calculate total = cart.totalPrice + shippingCost (default ₹10)
6. Create order document → pre('save') generates orderNumber like "ORD-M5K2X9-A3B7C"
7. Deduct stock: Product.findByIdAndUpdate($inc: { stock: -quantity }) for each item
8. Clear cart: cart.items = [] → save
9. Return order with populated products
```

**Important:** Order stores product name and price as snapshots. Even if product price changes later, the order keeps the original price.

---

## 10. Practical Scenarios

### If API is slow, what happens?
The frontend keeps showing loading state. Axios has no timeout configured, so it waits indefinitely. The user sees a spinner or loading indicator. If the server takes too long, the browser may eventually timeout. There's no retry logic on the frontend — user has to manually retry.

### If token expires?
The JWT expires after 24 hours (configured in tokenUtils.js). When user makes any API call:
1. `protect` middleware calls `jwt.verify()` → throws `TokenExpiredError`
2. Server returns 401 with code `TOKEN_EXPIRED`
3. Axios response interceptor catches 401 → removes token from localStorage → redirects to `/login`
4. User has to login again to get a new token

### If database fails?
The `db.js` connection has 3 retries with exponential backoff (2s, 4s, 6s). If all 3 fail:
- Server continues running WITHOUT database connection
- Console shows warning: "Server will continue without database connection"
- All API calls that need DB will fail with 500 errors
- The server doesn't crash — it just can't serve data

### If user adds same product twice to cart?
The `addToCart` controller checks: does an item with same `productId` AND same `size` already exist?
- **Same product, same size:** Increases quantity (doesn't create duplicate)
- **Same product, different size:** Creates a new cart item (treated as different item)
- Stock is re-validated after quantity increase

### If user adds same product to wishlist twice?
The `addToWishlist` controller checks `wishlist.products.includes(productId)`. If already present → returns 400 with code `DUPLICATE_PRODUCT`. No duplicate allowed.

### If frontend crashes?
- Cart data for logged-in users is safe in MongoDB — they can refresh and data loads from server
- Guest cart data is in localStorage — survives page refresh but lost if browser data is cleared
- Auth token is in localStorage — user stays logged in after refresh
- No data loss on server side

### If product goes out of stock after adding to cart?
- Stock is checked at two points: when adding to cart AND when placing order
- If stock runs out between adding and ordering → createOrder returns 400 "Insufficient stock for [product name]"
- Cart items are NOT auto-removed when stock changes

---

## 11. Debugging Approach

### Step-by-step to find bugs:

1. **Check browser console** — Look for JavaScript errors, failed network requests (red in Network tab)

2. **Check Network tab** — See the actual request URL, headers, body, and response. Check status code:
   - 400 = validation error (check request body)
   - 401 = auth issue (check token in headers)
   - 404 = wrong URL or resource not found
   - 500 = server error (check server logs)

3. **Check server terminal** — Express logs errors with `console.error()`. Look for stack traces.

4. **Check MongoDB** — Use MongoDB Atlas dashboard or Compass to verify data exists and is correct.

5. **Test API independently** — Use Postman to hit the endpoint directly. This isolates frontend vs backend issues.

6. **Add console.log** — In controller functions, log `req.body`, `req.params`, `req.user` to see what data arrives.

7. **Check middleware order** — In routes, middleware runs left to right. If `protect` is missing, `req.user` will be undefined.

8. **Check .env file** — Missing `JWT_SECRET`, `MONGODB_URI`, or `OPENAI_API_KEY` causes silent failures.

9. **Check CORS** — If frontend and backend are on different ports, CORS must allow the frontend origin. Currently configured as `process.env.CLIENT_URL || 'http://localhost:3000'`.

10. **Check proxy** — Frontend `package.json` has `"proxy": "http://localhost:5001"` so `/api` calls are forwarded to backend during development.


---

## 12. Security

### What is implemented:

- **JWT Authentication** — Token-based auth using jsonwebtoken. Token contains `{ id: userId }`, signed with `JWT_SECRET`, expires in 24h.

- **Password Hashing** — bcryptjs with salt rounds 10. Passwords are never stored in plain text. `select: false` on password field means it's excluded from queries by default.

- **Input Validation** — express-validator on auth routes (register, login, reset-password), cart routes (add, update), wishlist routes (move-to-cart), and order routes (create). Validates required fields, email format, password length, MongoId format, etc.

- **Rate Limiting** — General: 100 requests per 15 minutes on all `/api` routes. Auth: 5 requests per 15 minutes on login/register/reset-password. Both are skipped in development mode.

- **CORS** — Configured to only allow requests from `CLIENT_URL` (http://localhost:3001 in .env). `credentials: true` allows cookies.

- **Error Handling** — Global error handler in server.js catches unhandled errors. Stack trace only shown in development mode. 404 handler for unknown routes.

- **Token Verification** — `protect` middleware handles: missing token (NO_TOKEN), expired token (TOKEN_EXPIRED), invalid token (INVALID_TOKEN), user not found (USER_NOT_FOUND).

- **Authorization Check** — Order getById checks `order.user !== req.user.id` → returns 403 if user tries to access someone else's order.

- **Credential Hiding** — Login returns same "Invalid credentials" message for both wrong email and wrong password (doesn't reveal which one is wrong). Reset password returns same message whether email exists or not.

---

## 13. Limitations (Real)

1. **No payment gateway** — Orders are created with `paymentStatus: 'pending'` but no actual payment processing (no Razorpay/Stripe integration)

2. **No email service** — Reset password endpoint is a placeholder. No actual email is sent.

3. **No admin role enforcement** — Any logged-in user can add products and access `/admin/add-product`. The `isAdmin` field exists in User model but is never checked.

4. **No image upload** — Product images are stored as URL strings. No file upload functionality (no multer, no S3).

5. **No order status updates** — Orders are created as 'pending' but there's no API to update status to processing/shipped/delivered.

6. **No product reviews** — `rating` and `numReviews` fields exist but there's no review submission API.

7. **No product update/delete** — Only create and read. No PUT/DELETE endpoints for products.

8. **Token blacklisting not implemented** — Logout is client-side only (removes token from localStorage). A stolen token remains valid until it expires.

9. **No refresh token** — Single JWT with 24h expiry. User must re-login after expiry.

10. **Guest cart not synced** — When a guest logs in, their localStorage cart is NOT merged with their server cart.

11. **No pagination on frontend** — Backend supports pagination but frontend loads all products at once.

12. **OpenAI API key required** — Chat and description features don't work without a valid API key.

13. **No order cancellation** — No endpoint to cancel an order or restore stock.

14. **Rate limiter skipped in development** — `skip: () => process.env.NODE_ENV === 'development'` means no rate limiting during dev.

---

## 14. Improvements (Simple, Realistic)

1. Add Razorpay or Stripe payment integration
2. Add admin middleware to restrict product creation to admin users only
3. Add image upload with multer + cloud storage (Cloudinary or S3)
4. Add product update and delete endpoints
5. Add order status update API (for admin)
6. Add product review and rating system
7. Implement email service (nodemailer) for password reset and order confirmation
8. Add refresh token mechanism for better auth UX
9. Merge guest cart with server cart on login
10. Add frontend pagination for product listing
11. Add product sorting (by price, rating, newest)
12. Add order cancellation with stock restoration
13. Add search suggestions / autocomplete
14. Add user profile page with order history
15. Deploy to production (Vercel for frontend, Railway/Render for backend)


---

## 15. Coding Questions (Based on This Project)

### Q1: Write the Login API logic

```javascript
// controllers/authController.js
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password provided
    if (!email || !password) {
      return res.status(400).json({ success: false, error: { message: 'Please provide email and password' } });
    }

    // 2. Find user by email — include password field (normally hidden)
    const user = await User.findOne({ email }).select('+password');

    // 3. If no user found
    if (!user) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

    // 4. Compare password using bcrypt
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

    // 5. Generate JWT token
    const token = generateToken(user._id);

    // 6. Return token and user data
    res.status(200).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email } }
    });
  } catch (error) {
    next(error);
  }
};
```

### Q2: Write JWT middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Extract token from "Bearer <token>" header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. No token = not authorized
  if (!token) {
    return res.status(401).json({ success: false, error: { message: 'Not authorized', code: 'NO_TOKEN' } });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user from token payload
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, error: { message: 'User not found' } });
    }

    // 5. User is authenticated — proceed
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, error: { message: 'Token expired' } });
    }
    return res.status(401).json({ success: false, error: { message: 'Invalid token' } });
  }
};
```

### Q3: Write Add-to-Cart logic

```javascript
// controllers/cartController.js
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size } = req.body;

    // 1. Check product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, error: { message: 'Product not found' } });

    // 2. Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, error: { message: 'Insufficient stock' } });
    }

    // 3. Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    // 4. Check if same product+size already in cart
    const existingIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingIndex > -1) {
      // Already exists — increase quantity
      cart.items[existingIndex].quantity += quantity;
    } else {
      // New item — add to cart
      cart.items.push({ product: productId, quantity, size, price: product.price });
    }

    // 5. Save (pre-save hook calculates totalPrice)
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({ success: true, data: { cart } });
  } catch (error) {
    next(error);
  }
};
```

### Q4: Write a basic API route example

```javascript
// routes/products.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

// GET /api/products — public, returns all products with filters
router.get('/', getAllProducts);

// GET /api/products/:id — public, returns single product
router.get('/:id', getProductById);

module.exports = router;

// In server.js:
app.use('/api/products', require('./routes/products'));
```


---

## 16. Real Interview Questions (20 Questions with Answers)

**Q1: Tell me about your project.**
I built a full-stack e-commerce website called Purrchase using the MERN stack. It has user authentication with JWT, product browsing with category filters, shopping cart, wishlist, order placement, and an AI chatbot powered by OpenAI that can suggest products from the database. The backend is a REST API with Express and MongoDB Atlas.

**Q2: Why did you choose the MERN stack?**
Because all four technologies use JavaScript, so I can work on both frontend and backend with one language. React is great for building interactive UIs, Express is lightweight for APIs, MongoDB is flexible with its document structure — no rigid schema needed, and Node.js handles async operations well for an e-commerce app.

**Q3: How does authentication work in your project?**
When a user registers or logs in, the server creates a JWT token containing the user's ID, signed with a secret key. This token is sent to the frontend and stored in localStorage. For every API request, an Axios interceptor automatically adds this token in the Authorization header. On the server, a protect middleware verifies the token and attaches the user to the request.

**Q4: Why JWT instead of sessions?**
JWT is stateless — the server doesn't need to store session data. This makes it easier to scale because any server can verify the token independently. It also works well with React SPAs since we just store the token in localStorage and send it with each request.

**Q5: How do you store passwords?**
I use bcryptjs to hash passwords before saving to the database. When a user registers, a pre-save hook on the User model generates a salt (10 rounds) and hashes the password. The plain text password is never stored. During login, I use bcrypt.compare() to check if the entered password matches the hash.

**Q6: Explain your cart logic.**
Each logged-in user has one cart document in MongoDB (enforced by a unique index on user). When adding a product, the server checks if the same product with the same size already exists in the cart — if yes, it increases the quantity; if no, it adds a new item. A pre-save hook automatically calculates the total price. For guest users, the cart is stored in localStorage on the browser.

**Q7: How does the order process work?**
When a user places an order, the server fetches their cart, validates stock for every item, creates an order document with product snapshots (name and price are copied, not referenced), deducts stock from each product, clears the cart, and returns the order. The order number is auto-generated using timestamp + random string.

**Q8: Why do you snapshot product data in orders?**
Because product prices can change after an order is placed. If I only stored a reference to the product, the order total would change when the product price changes. By copying the name and price into the order, the order record stays accurate forever.

**Q9: How does your AI chatbot work?**
The chatbot receives a user message, extracts keywords (categories, price ranges, search terms) using helper functions, queries MongoDB to find matching products, formats those products as context, and sends everything to OpenAI GPT-4o-mini. The AI then responds with product recommendations based on actual database data, not made-up products.

**Q10: What happens when the JWT token expires?**
The token expires after 24 hours. When the user makes an API call with an expired token, the protect middleware catches the TokenExpiredError and returns a 401 status. The Axios response interceptor on the frontend detects the 401, removes the token from localStorage, and redirects the user to the login page.

**Q11: How do you handle errors in your API?**
Each controller uses try-catch blocks. Errors are passed to Express's next() function, which triggers the global error handler in server.js. The error handler returns a JSON response with the error message and, in development mode, the stack trace. Specific errors like CastError (invalid MongoDB ID) are caught and return 404 instead of 500.

**Q12: What is the protect middleware doing?**
It extracts the Bearer token from the Authorization header, verifies it using jwt.verify() with the secret key, finds the user by the decoded ID, and attaches the user object to req.user. If anything fails — no token, expired token, invalid token, user not found — it returns 401 and stops the request.

**Q13: How does rate limiting work?**
I use express-rate-limit with two configurations. The general limiter allows 100 requests per 15 minutes on all API routes. The auth limiter allows only 5 requests per 15 minutes on login/register/reset-password to prevent brute force attacks. Both are skipped in development mode for easier testing.

**Q14: How do you validate user input?**
I use express-validator in the route files. Each route has validation rules — like checking email format, password minimum length, required fields. After validation rules run, a custom validate middleware checks for errors and returns a 400 response with details about which fields failed and why.

**Q15: What is the difference between your cart and wishlist?**
The cart stores items with quantity, size, and price — it's for items the user wants to buy. The wishlist is just a list of product references — no quantity or size. The wishlist has a "move to cart" feature that transfers a product from wishlist to cart with a specified quantity and size, and optionally removes it from the wishlist.

**Q16: How does the frontend manage state?**
I use React Context API with three contexts: AuthContext (user, token, login/logout functions), CartContext (cart items, add/remove/update functions, cart count), and WishlistContext (wishlist items, add/remove functions, wishlist count). Components use custom hooks like useAuth(), useCart(), useWishlist() to access state.

**Q17: How does the Axios interceptor work?**
I created a custom Axios instance with baseURL '/api'. The request interceptor checks localStorage for a token and adds it to every request's Authorization header automatically. The response interceptor catches 401 errors, clears the token, and redirects to login. This means I don't have to manually add the token to every API call.

**Q18: What would you improve in this project?**
I'd add a payment gateway like Razorpay, implement proper admin role checking before allowing product creation, add image upload with Cloudinary, implement email notifications for orders, add a refresh token mechanism so users don't have to re-login every 24 hours, and merge the guest cart with the server cart when a user logs in.

**Q19: How does MongoDB text search work in your project?**
I created a compound text index on the Product model: `{ name: 'text', description: 'text' }`. When a user searches, the backend uses `Product.find({ $text: { $search: query } })` which searches across both fields. Results are sorted by text relevance score using `{ score: { $meta: 'textScore' } }`.

**Q20: How do you handle the case where a product is deleted but it's in someone's cart?**
Currently, if a product is deleted from the database, the cart still has a reference to it. When the user tries to place an order, the createOrder controller checks `if (!item.product)` after populating — if the product doesn't exist anymore, it returns a 400 error saying "One or more products no longer exist." The cart item stays until the user removes it manually.

---

*This analysis is based entirely on the actual source code of the Purrchase project. No assumptions or fake concepts included.*
