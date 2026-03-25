# Purrchase — E-Commerce Web Application

A full-stack MERN e-commerce application with product browsing, cart/wishlist management, order placement, and AI-powered chatbot and product description generation.

## Tech Stack

- **Frontend:** React 19, React Router, Axios, Context API
- **Backend:** Node.js, Express 5, Mongoose, JWT Authentication
- **Database:** MongoDB Atlas
- **AI:** OpenAI GPT-4o-mini (chatbot + description generator)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (optional, for AI features)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/purrchase-ecommerce.git
cd purrchase-ecommerce
```

2. Set up the server:
```bash
cd server
npm install
cp .env.example .env
```

3. Edit `server/.env` with your credentials:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
OPENAI_API_KEY=your_openai_api_key
```

4. Seed the database (optional):
```bash
node seedDatabase.js
```

5. Set up the client:
```bash
cd ../client
npm install
```

6. Run the application:
```bash
# Terminal 1 — Server (port 5001)
cd server
npm run dev

# Terminal 2 — Client (port 3001)
cd client
npm start
```

## Features

- User registration and login (JWT)
- Product listing with category filters and search
- Shopping cart (authenticated + guest via localStorage)
- Wishlist management
- Order placement with stock validation
- AI Chatbot with product recommendations
- AI Product Description Generator
- Rate limiting and input validation

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── public/
├── server/          # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
```

## License

ISC
