require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // CLOTHING CATEGORY
  {
    name: 'Cartoon Astronaut T-Shirt',
    description: 'Comfortable cotton t-shirt with cartoon astronaut print. Perfect for casual wear.',
    price: 78,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/f1.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    rating: 4,
    numReviews: 12,
    featured: true
  },
  {
    name: 'Cartoon Astronaut T-Shirt - Blue',
    description: 'Stylish blue t-shirt with unique astronaut design.',
    price: 78,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/f2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45,
    rating: 4,
    numReviews: 8,
    featured: true
  },
  {
    name: 'Casual Khaki Pants',
    description: 'Comfortable khaki pants for casual occasions.',
    price: 110,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/n7.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    rating: 4.3,
    numReviews: 11,
    featured: false
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans.',
    price: 125,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/n8.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    rating: 4.5,
    numReviews: 20,
    featured: false
  },
  {
    name: 'Premium Cotton Shirt',
    description: 'High-quality premium cotton shirt for professional look.',
    price: 98,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/f1.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    rating: 4.4,
    numReviews: 17,
    featured: true
  },
  {
    name: 'Casual Crew Neck Tee',
    description: 'Comfortable crew neck t-shirt for everyday wear.',
    price: 72,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/f2.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 55,
    rating: 4.2,
    numReviews: 14,
    featured: false
  },
  {
    name: 'Relaxed Fit Jeans',
    description: 'Comfortable relaxed fit jeans for casual style.',
    price: 115,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/f3.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 28,
    rating: 4.3,
    numReviews: 12,
    featured: false
  },
  {
    name: 'Chino Pants',
    description: 'Versatile chino pants for any occasion.',
    price: 105,
    brand: 'adidas',
    category: 'clothing',
    images: ['/img/products/f6.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 26,
    rating: 4.4,
    numReviews: 15,
    featured: false
  },

  // ELECTRONICS CATEGORY
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 2499,
    brand: 'Sony',
    category: 'electronics',
    images: ['/img/products/f4.jpg'],
    sizes: ['One Size'],
    stock: 30,
    rating: 4.5,
    numReviews: 45,
    featured: true
  },
  {
    name: 'USB-C Fast Charger',
    description: '65W USB-C fast charger for all devices.',
    price: 1299,
    brand: 'Anker',
    category: 'electronics',
    images: ['/img/products/f5.jpg'],
    sizes: ['One Size'],
    stock: 50,
    rating: 4.3,
    numReviews: 32,
    featured: false
  },
  {
    name: 'Portable Power Bank 20000mAh',
    description: 'Fast charging power bank with dual USB ports.',
    price: 1899,
    brand: 'Mi',
    category: 'electronics',
    images: ['/img/products/f6.jpg'],
    sizes: ['One Size'],
    stock: 40,
    rating: 4.4,
    numReviews: 28,
    featured: true
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking.',
    price: 799,
    brand: 'Logitech',
    category: 'electronics',
    images: ['/img/products/f7.jpg'],
    sizes: ['One Size'],
    stock: 35,
    rating: 4.2,
    numReviews: 22,
    featured: false
  },
  {
    name: 'USB Hub 7-in-1',
    description: 'Multi-port USB hub for expanded connectivity.',
    price: 1499,
    brand: 'Belkin',
    category: 'electronics',
    images: ['/img/products/f8.jpg'],
    sizes: ['One Size'],
    stock: 25,
    rating: 4.1,
    numReviews: 18,
    featured: false
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming mechanical keyboard with RGB lighting.',
    price: 3499,
    brand: 'Corsair',
    category: 'electronics',
    images: ['/img/products/n1.jpg'],
    sizes: ['One Size'],
    stock: 20,
    rating: 4.6,
    numReviews: 35,
    featured: true
  },

  // GROCERY CATEGORY
  {
    name: 'Organic Basmati Rice 5kg',
    description: 'Premium quality organic basmati rice.',
    price: 599,
    brand: 'Nature\'s Best',
    category: 'grocery',
    images: ['/img/products/n2.jpg'],
    sizes: ['5kg'],
    stock: 100,
    rating: 4.4,
    numReviews: 52,
    featured: true
  },
  {
    name: 'Extra Virgin Olive Oil 500ml',
    description: 'Cold-pressed extra virgin olive oil.',
    price: 899,
    brand: 'Mediterranean',
    category: 'grocery',
    images: ['/img/products/n3.jpg'],
    sizes: ['500ml'],
    stock: 45,
    rating: 4.5,
    numReviews: 38,
    featured: false
  },
  {
    name: 'Whole Wheat Flour 2kg',
    description: 'Nutritious whole wheat flour for baking.',
    price: 249,
    brand: 'Golden Grain',
    category: 'grocery',
    images: ['/img/products/n4.jpg'],
    sizes: ['2kg'],
    stock: 80,
    rating: 4.2,
    numReviews: 25,
    featured: false
  },
  {
    name: 'Honey Pure 500g',
    description: 'Pure raw honey with no additives.',
    price: 449,
    brand: 'Bee Fresh',
    category: 'grocery',
    images: ['/img/products/n5.jpg'],
    sizes: ['500g'],
    stock: 60,
    rating: 4.6,
    numReviews: 42,
    featured: true
  },
  {
    name: 'Almonds Premium 250g',
    description: 'Premium quality roasted almonds.',
    price: 599,
    brand: 'Nutri Valley',
    category: 'grocery',
    images: ['/img/products/n6.jpg'],
    sizes: ['250g'],
    stock: 50,
    rating: 4.3,
    numReviews: 30,
    featured: false
  },
  {
    name: 'Green Tea Organic 100 Bags',
    description: 'Organic green tea bags for daily wellness.',
    price: 349,
    brand: 'Tea Leaf',
    category: 'grocery',
    images: ['/img/products/n7.jpg'],
    sizes: ['100 bags'],
    stock: 70,
    rating: 4.4,
    numReviews: 28,
    featured: false
  },

  // SHOES CATEGORY
  {
    name: 'Running Shoes Pro',
    description: 'Professional running shoes with cushioning technology.',
    price: 4999,
    brand: 'Nike',
    category: 'shoes',
    images: ['/img/products/n8.jpg'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    stock: 35,
    rating: 4.5,
    numReviews: 48,
    featured: true
  },
  {
    name: 'Casual Sneakers White',
    description: 'Comfortable white casual sneakers for everyday wear.',
    price: 2499,
    brand: 'Adidas',
    category: 'shoes',
    images: ['/img/products/f1.jpg'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    stock: 45,
    rating: 4.3,
    numReviews: 35,
    featured: false
  },
  {
    name: 'Formal Leather Shoes',
    description: 'Premium leather formal shoes for office wear.',
    price: 3999,
    brand: 'Bata',
    category: 'shoes',
    images: ['/img/products/f2.jpg'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    stock: 28,
    rating: 4.6,
    numReviews: 42,
    featured: true
  },
  {
    name: 'Sports Sandals',
    description: 'Lightweight sports sandals for outdoor activities.',
    price: 1299,
    brand: 'Puma',
    category: 'shoes',
    images: ['/img/products/f3.jpg'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    stock: 50,
    rating: 4.2,
    numReviews: 28,
    featured: false
  },
  {
    name: 'Basketball Shoes',
    description: 'High-performance basketball shoes with ankle support.',
    price: 5499,
    brand: 'Jordan',
    category: 'shoes',
    images: ['/img/products/f4.jpg'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    stock: 22,
    rating: 4.7,
    numReviews: 55,
    featured: true
  },
  {
    name: 'Loafers Comfort',
    description: 'Comfortable loafers for casual and semi-formal occasions.',
    price: 2799,
    brand: 'Clarks',
    category: 'shoes',
    images: ['/img/products/f5.jpg'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    stock: 32,
    rating: 4.4,
    numReviews: 31,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`✅ ${result.length} products added successfully!`);

    // Show sample products
    console.log('\n📦 Sample Products Added:');
    result.slice(0, 5).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });
    console.log(`... and ${result.length - 5} more products\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
