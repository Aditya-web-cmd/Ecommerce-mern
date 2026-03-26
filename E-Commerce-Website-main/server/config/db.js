const mongoose = require('mongoose');

const connectDB = async () => {
  let retries = 3;
  
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      retries -= 1;
      console.error(`❌ MongoDB connection error: ${error.message}`);
      
      if (retries === 0) {
        console.warn('⚠️  Failed to connect to MongoDB after 3 attempts');
        console.warn('⚠️  Server will continue without database connection');
        console.warn('⚠️  Update MONGODB_URI in .env to connect to MongoDB Atlas or local instance');
        return;
      }
      
      // Exponential backoff
      const delay = (4 - retries) * 2000;
      console.log(`Retrying in ${delay / 1000} seconds... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

module.exports = connectDB;
