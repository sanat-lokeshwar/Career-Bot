/**
 * api.js
 * Centralized Axios instance for backend communication.
 * Automatically attaches Firebase token to every request.
 */

import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change if deployed
});

// Attach token automatically before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
