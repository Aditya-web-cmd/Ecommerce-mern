const { OpenAI } = require('openai');
const Product = require('../models/Product');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Helper function: Extract keywords from user message
const extractKeywords = (message) => {
  const lowerMessage = message.toLowerCase();
  
  const keywords = {
    categories: [],
    priceRange: { min: null, max: null },
    searchTerms: []
  };

  // Category keywords
  const categoryMap = {
    clothing: ['shirt', 'tshirt', 't-shirt', 'pants', 'jeans', 'clothes', 'apparel', 'wear', 'dress', 'outfit'],
    electronics: ['phone', 'laptop', 'headphone', 'charger', 'keyboard', 'mouse', 'gadget', 'device', 'tech', 'electronic'],
    grocery: ['food', 'rice', 'oil', 'flour', 'honey', 'almond', 'tea', 'grocery', 'snack', 'beverage'],
    shoes: ['shoe', 'sneaker', 'boot', 'sandal', 'loafer', 'footwear', 'running', 'casual', 'formal']
  };

  // Extract categories
  for (const [category, terms] of Object.entries(categoryMap)) {
    if (terms.some(term => lowerMessage.includes(term))) {
      keywords.categories.push(category);
    }
  }

  // Extract price range
  const pricePatterns = [
    /under\s+(\d+)/i,
    /below\s+(\d+)/i,
    /less\s+than\s+(\d+)/i,
    /cheaper\s+than\s+(\d+)/i,
    /max\s+(\d+)/i,
    /maximum\s+(\d+)/i,
    /₹\s*(\d+)/,
    /rs\s*(\d+)/i
  ];

  for (const pattern of pricePatterns) {
    const match = lowerMessage.match(pattern);
    if (match) {
      keywords.priceRange.max = parseInt(match[1]);
      break;
    }
  }

  // Extract price range (min-max)
  const rangePattern = /(\d+)\s*-\s*(\d+)/;
  const rangeMatch = lowerMessage.match(rangePattern);
  if (rangeMatch) {
    keywords.priceRange.min = parseInt(rangeMatch[1]);
    keywords.priceRange.max = parseInt(rangeMatch[2]);
  }

  // Extract search terms (words that might be product names)
  const words = lowerMessage.split(/\s+/);
  keywords.searchTerms = words.filter(word => 
    word.length > 3 && 
    !['what', 'show', 'find', 'have', 'want', 'need', 'like', 'cheap', 'under', 'below', 'less', 'more', 'best', 'good'].includes(word)
  );

  return keywords;
};

// Helper function: Filter products based on keywords
const filterProducts = async (keywords) => {
  try {
    const query = {};

    // Filter by category
    if (keywords.categories.length > 0) {
      query.category = { $in: keywords.categories };
    }

    // Filter by price range
    if (keywords.priceRange.min !== null || keywords.priceRange.max !== null) {
      query.price = {};
      if (keywords.priceRange.min !== null) {
        query.price.$gte = keywords.priceRange.min;
      }
      if (keywords.priceRange.max !== null) {
        query.price.$lte = keywords.priceRange.max;
      }
    }

    // Search by name or description
    if (keywords.searchTerms.length > 0) {
      const searchQuery = keywords.searchTerms.join(' ');
      query.$text = { $search: searchQuery };
    }

    // Execute query with limit
    const products = await Product.find(query)
      .limit(5)
      .select('name price category description images rating');

    return products;
  } catch (error) {
    console.error('Error filtering products:', error);
    return [];
  }
};

// Helper function: Format products for AI context
const formatProductsForAI = (products) => {
  if (products.length === 0) {
    return 'No products found matching the criteria.';
  }

  let productText = `Found ${products.length} relevant products:\n\n`;
  
  products.forEach((product, index) => {
    productText += `${index + 1}. ${product.name}\n`;
    productText += `   Category: ${product.category}\n`;
    productText += `   Price: ₹${product.price}\n`;
    productText += `   Rating: ${product.rating}/5\n`;
    productText += `   Description: ${product.description}\n\n`;
  });

  return productText;
};

// @desc    Send message to AI chatbot with product suggestions
// @route   POST /api/chat
// @access  Public
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Validation
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a message'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'OpenAI API key not configured'
      });
    }

    // Extract keywords from user message
    const keywords = extractKeywords(message);
    console.log('Extracted keywords:', keywords);

    // Filter products based on keywords
    let relevantProducts = [];
    let productContext = '';

    // Only search for products if user is asking about products
    const isProductQuery = keywords.categories.length > 0 || 
                          keywords.priceRange.max !== null || 
                          keywords.searchTerms.length > 0 ||
                          /product|item|buy|price|cost|cheap|expensive|show|find|have|available/.test(message.toLowerCase());

    if (isProductQuery) {
      relevantProducts = await filterProducts(keywords);
      productContext = formatProductsForAI(relevantProducts);
      console.log('Found products:', relevantProducts.length);
    }

    // Build system prompt with product context
    let systemPrompt = `You are a helpful e-commerce customer support assistant. Help customers with product information, orders, and general questions about the store. Keep responses concise and friendly.`;

    if (productContext) {
      systemPrompt += `\n\nHere are relevant products from our store:\n${productContext}\n\nBased on the user's query, recommend these products if they match what the user is looking for. Include product names, prices, and why they might be a good fit.`;
    }

    // Send message to OpenAI with product context
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message.trim()
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    // Extract bot response
    const botMessage = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        userMessage: message,
        botMessage: botMessage,
        productsFound: relevantProducts.length,
        products: relevantProducts.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          category: p.category,
          rating: p.rating
        }))
      }
    });

  } catch (error) {
    console.error('Chat error:', error);

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(401).json({
        success: false,
        message: 'Invalid OpenAI API key'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error processing your message. Please try again.',
      error: error.message
    });
  }
};

