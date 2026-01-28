import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// Property APIs
export const propertyService = {
  getApprovedProperties: (filters) => api.get('/properties', { params: filters }),
  getPropertyStats: () => api.get('/properties/stats'),
  getPropertyDetails: (id) => api.get(`/properties/${id}`),
  createProperty: (data) => api.post('/properties', data),
  getSellerProperties: () => api.get('/properties/seller/my-properties'),
  editProperty: (id, data) => api.put(`/properties/${id}`, data),
};

// Enquiry APIs
export const enquiryService = {
  submitEnquiry: (data) => api.post('/enquiries', data),
  getEnquiries: (filters) => api.get('/enquiries', { params: filters }),
  updateEnquiryStatus: (id, data) => api.patch(`/enquiries/${id}`, data),
};

// Admin APIs
export const adminService = {
  onboardSeller: (data) => api.post('/admin/sellers/onboard', data),
  getSellers: () => api.get('/admin/sellers'),
  toggleSellerStatus: (id) => api.patch(`/admin/sellers/${id}/toggle-status`),
  getPendingProperties: () => api.get('/admin/properties/pending'),
  getAllProperties: () => api.get('/admin/properties'),
  approveProperty: (id, data) => api.patch(`/admin/properties/${id}/approve`, data),
  rejectProperty: (id, data) => api.patch(`/admin/properties/${id}/reject`, data),
  getDashboardStats: () => api.get('/admin/stats'),
  getRecentEnquiries: () => api.get('/enquiries'),
};

export default api;
