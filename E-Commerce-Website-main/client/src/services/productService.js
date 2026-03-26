import api from './api';

export const getAllProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/products?${params}`);
  return response.data;
};

export const searchProducts = async (query, page = 1) => {
  const response = await api.get(`/products/search?q=${query}&page=${page}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getFeaturedProducts = async (limit = 8) => {
  const response = await api.get(`/products/featured?limit=${limit}`);
  return response.data;
};
