import axios from 'axios';
import store from './store/store'; 

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

// This is the interceptor. It runs before every single request.
API.interceptors.request.use((config) => {
  // Get the user info from the Redux state
  const { userInfo } = store.getState().auth;
  if (userInfo) {
    // If the user is logged in, add their token to the Authorization header
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;