
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://task-manager-server-production-6d03.up.railway.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 Making request to:', config.url);
    console.log('🔐 Authorization header:', config.headers.Authorization ? 'Present' : 'Missing');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;