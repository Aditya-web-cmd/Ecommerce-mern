const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @desc    Generate product description using AI
// @route   POST /api/generate-description
// @access  Public
exports.generateDescription = async (req, res) => {
  try {
    const { productName, category } = req.body;

    // Validation
    if (!productName || productName.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a product name'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'OpenAI API key not configured'
      });
    }

    // Build prompt for description generation
    let prompt = `Generate a compelling and concise product description for an e-commerce store for the following product:

Product Name: ${productName.trim()}`;

    if (category) {
      prompt += `\nCategory: ${category}`;
    }

    prompt += `

Requirements:
- Keep it between 100-200 words
- Make it engaging and persuasive
- Highlight key features and benefits
- Use simple, clear language
- Include why customers should buy this product
- Do not include price information
- Format as a single paragraph`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert e-commerce product description writer. Create compelling, accurate, and engaging product descriptions that help customers make purchasing decisions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.8
    });

    // Extract description
    const description = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        productName: productName.trim(),
        category: category || 'General',
        description: description,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Description generation error:', error);

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
      message: 'Error generating description. Please try again.',
      error: error.message
    });
  }
};
