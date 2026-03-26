const Product = require('../models/Product');

const products = [
  {
    name: 'Cartoon Astronaut T-Shirt',
    description: 'Comfortable cotton t-shirt with cartoon astronaut print. Perfect for casual wear.',
    price: 78,
    brand: 'adidas',
    category: 'T-Shirts',
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
    category: 'T-Shirts',
    images: ['/img/products/f2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45,
    rating: 4,
    numReviews: 8,
    featured: true
  },
  {
    name: 'Cartoon Astronaut T-Shirt - Green',
    description: 'Fresh green t-shirt with astronaut graphic.',
    price: 78,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/f3.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    rating: 4,
    numReviews: 15,
    featured: true
  },
  {
    name: 'Cartoon Astronaut T-Shirt - Pink',
    description: 'Trendy pink t-shirt with fun astronaut print.',
    price: 78,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/f4.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    rating: 4,
    numReviews: 10,
    featured: true
  },
  {
    name: 'Cartoon Astronaut T-Shirt - Red',
    description: 'Bold red t-shirt with astronaut design.',
    price: 78,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/f5.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30,
    rating: 4,
    numReviews: 7,
    featured: true
  },
  {
    name: 'Cartoon Astronaut T-Shirt - Navy',
    description: 'Classic navy t-shirt with space theme.',
    price: 78,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/f6.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 42,
    rating: 4,
    numReviews: 9,
    featured: true
  },
  {
    name: 'Cartoon Astronaut T-Shirt - Beige',
    description: 'Neutral beige t-shirt with astronaut graphic.',
    price: 78,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/f7.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 38,
    rating: 4,
    numReviews: 11,
    featured: true
  },
  {
    name: 'Cartoon Astronaut T-Shirt - Orange',
    description: 'Vibrant orange t-shirt with space design.',
    price: 78,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/f8.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 33,
    rating: 4,
    numReviews: 6,
    featured: true
  },
  {
    name: 'Floral Print Shirt',
    description: 'Elegant floral print shirt for summer collection.',
    price: 85,
    brand: 'adidas',
    category: 'Shirts',
    images: ['/img/products/n1.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    rating: 4.5,
    numReviews: 14,
    featured: false
  },
  {
    name: 'Casual Denim Shirt',
    description: 'Classic denim shirt for everyday wear.',
    price: 92,
    brand: 'adidas',
    category: 'Shirts',
    images: ['/img/products/n2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 28,
    rating: 4.2,
    numReviews: 13,
    featured: false
  },
  {
    name: 'Striped Polo Shirt',
    description: 'Modern striped polo shirt.',
    price: 88,
    brand: 'adidas',
    category: 'Shirts',
    images: ['/img/products/n3.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 32,
    rating: 4.3,
    numReviews: 16,
    featured: false
  },
  {
    name: 'Graphic Print Tee',
    description: 'Trendy graphic print t-shirt.',
    price: 75,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/n4.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    rating: 4.1,
    numReviews: 18,
    featured: false
  },
  {
    name: 'Plain White Tee',
    description: 'Essential plain white t-shirt.',
    price: 65,
    brand: 'adidas',
    category: 'T-Shirts',
    images: ['/img/products/n5.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 60,
    rating: 4.4,
    numReviews: 22,
    featured: false
  },
  {
    name: 'Vintage Wash Shirt',
    description: 'Stylish vintage wash shirt.',
    price: 95,
    brand: 'adidas',
    category: 'Shirts',
    images: ['/img/products/n6.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    rating: 4.6,
    numReviews: 19,
    featured: false
  },
  {
    name: 'Casual Khaki Pants',
    description: 'Comfortable khaki pants for casual occasions.',
    price: 110,
    brand: 'adidas',
    category: 'Pants',
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
    category: 'Pants',
    images: ['/img/products/n8.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    rating: 4.5,
    numReviews: 20,
    featured: false
  }
];

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert new products
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

module.exports = seedProducts;
