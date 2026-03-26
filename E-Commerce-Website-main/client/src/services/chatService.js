import api from './api';

export const sendChatMessage = async (message) => {
  try {
    const response = await api.post('/chat', {
      message: message
    });
    return response.data;
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};
