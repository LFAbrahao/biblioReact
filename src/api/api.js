

import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000', 
});


api.interceptors.request.use(
  (config) => {
    // Busca o token no localStorage após o login.
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

export default api;