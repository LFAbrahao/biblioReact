// src/api/api.js

import axios from 'axios';

// Crie a instância do Axios com a URL base do seu backend.
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // IMPORTANTE: Altere para a URL real do seu backend
});

// Crie um "interceptor" para injetar o token de autenticação em cada requisição.
api.interceptors.request.use(
  (config) => {
    // Busque o token que você salvou no localStorage após o login.
    const token = localStorage.getItem('authToken');

    // Se o token existir, adicione-o ao cabeçalho (header) de autorização.
    // O formato 'Bearer TOKEN' é um padrão comum.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorne a configuração modificada para que a requisição prossiga.
    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição, retorne o erro.
    return Promise.reject(error);
  }
);

export default api;