# Purrchase E-Commerce - Database Schema

MongoDB Atlas | Database: `ecommerce` | 5 Collections

---

## 1. users

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary key |
| name | String | Yes | Max 50 chars |
| email | String | Yes | Unique, lowercase |
| password | String | Yes | Hashed (bcrypt), min 6 chars |
| isAdmin | Boolean | No | Default: false |
| createdAt | Date | Auto | |
| updatedAt | Date | Auto | |

---

## 2. products

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary key |
| name | String | Yes | Max 100, text-indexed |
| description | String | No | Max 2000, text-indexed |
| price | Number | Yes | Min 0 |
| brand | String | No | |
| category | String | Yes | Enum: `clothing`, `electronics`, `grocery`, `shoes` |
| images | [String] | No | Array of image URLs |
| sizes | [String] | No | Enum: `XS`, `S`, `M`, `L`, `XL`, `XXL` |
| stock | Number | No | Default: 0 |
| rating | Number | No | 0 to 5 |
| numReviews | Number | No | Default: 0 |
| featured | Boolean | No | Default: false |
| createdAt | Date | Auto | |
| updatedAt | Date | Auto | |

---

## 3. carts

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary key |
| user | ObjectId → users | Yes | Unique per user |
| items[].product | ObjectId → products | Yes | |
| items[].quantity | Number | Yes | Min 1 |
| items[].size | String | No | Enum: `XS`, `S`, `M`, `L`, `XL`, `XXL` |
| items[].price | Number | Yes | |
| totalPrice | Number | Auto | Calculated on save |
| updatedAt | Date | Auto | |

---

## 4. wishlists

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary key |
| user | ObjectId → users | Yes | Unique per user |
| products | [ObjectId → products] | No | Array of product refs |
| updatedAt | Date | Auto | |

---

## 5. orders

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary key |
| orderNumber | String | Auto | Auto-generated (ORD-xxx) |
| user | ObjectId → users | Yes | |
| items[].product | ObjectId → products | No | |
| items[].name | String | Yes | |
| items[].quantity | Number | Yes | Min 1 |
| items[].size | String | No | |
| items[].price | Number | Yes | |
| shippingAddress.street | String | Yes | |
| shippingAddress.city | String | Yes | |
| shippingAddress.state | String | Yes | |
| shippingAddress.postalCode | String | Yes | |
| shippingAddress.country | String | Yes | Default: USA |
| totalPrice | Number | Yes | |
| shippingCost | Number | No | Default: 0 |
| status | String | No | Enum: `pending`, `processing`, `shipped`, `delivered`, `cancelled` |
| paymentStatus | String | No | Enum: `pending`, `completed`, `failed` |
| paymentId | String | No | |
| statusHistory[] | Array | No | Status change log with timestamp |
| createdAt | Date | Auto | |
| updatedAt | Date | Auto | |

---

## Relationships

- **users** → **carts** (1 user has 1 cart)
- **users** → **wishlists** (1 user has 1 wishlist)
- **users** → **orders** (1 user has many orders)
- **products** → **carts.items** (products referenced in cart)
- **products** → **wishlists.products** (products referenced in wishlist)
- **products** → **orders.items** (products referenced in orders)
