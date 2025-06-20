// src/api/authService.js

import api from './api';

/**
 * Envia as credenciais do usuário para a API para fazer o login.
 * @param {object} credentials - Um objeto contendo email e password.
 * @returns {Promise<object>} Uma promise que resolve com os dados do usuário e o token.
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  
  // Após uma resposta de sucesso, a API deve retornar o token e os dados do usuário.
  if (response.data.token) {
    // Salva o token no localStorage para ser usado em futuras requisições.
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data; // Retorna { user, token }
};

/**
 * Realiza o logout do usuário, removendo o token de autenticação.
 */
export const logout = () => {
  // Simplesmente remove o token do localStorage.
  localStorage.removeItem('authToken');
  // Você pode também querer chamar um endpoint no backend para invalidar o token, se houver.
  // Ex: api.post('/auth/logout');
};

/**
 * Envia os dados de um novo usuário para registro.
 * @param {object} userData - Objeto com name, email, password.
 * @returns {Promise<object>} Uma promise que resolve com a resposta da API.
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};