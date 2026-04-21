import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (userData) => api.post('/auth/register', userData);
export const getProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createOrder = (orderData, token) => api.post('/orders', orderData, {
  headers: { Authorization: `Bearer ${token}` }
});
export const getOrders = (token) => api.get('/orders', {
  headers: { Authorization: `Bearer ${token}` }
});

export default api;