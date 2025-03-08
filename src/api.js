import axios from 'axios';

// Ensure API base URL is set from Render environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://blog-backend-kh3c.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Only needed if using cookies for authentication
});

// Axios interceptor: Attach JWT token from localStorage if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
