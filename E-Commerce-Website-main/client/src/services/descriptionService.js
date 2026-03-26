import api from './api';

export const generateProductDescription = async (productName, category = '') => {
  try {
    const response = await api.post('/generate-description', {
      productName: productName,
      category: category
    });
    return response.data;
  } catch (error) {
    console.error('Description generation error:', error);
    throw error;
  }
};
