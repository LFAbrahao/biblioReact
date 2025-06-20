// src/api/userService.js

import api from './api';

/**
 * Busca uma lista de usuários.
 * O backend deve garantir que apenas usuários autorizados (admin, bibliotecário) possam usar isso
 * e deve filtrar os resultados de acordo com a permissão do solicitante.
 * @returns {Promise<Array>} Uma promise que resolve com um array de usuários.
 */
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

/**
 * Cria um novo usuário (ação geralmente restrita ao Admin).
 * @param {object} userData - Dados do novo usuário, incluindo name, email, password e role.
 * @returns {Promise<object>} Uma promise que resolve com os dados do usuário criado.
 */
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

/**
 * Atualiza os dados de um usuário (ex: mudar a role, ação de Admin).
 * @param {string} userId - O ID do usuário a ser atualizado.
 * @param {object} updatedData - Os novos dados do usuário.
 * @returns {Promise<object>} Uma promise que resolve com os dados atualizados.
 */
export const updateUser = async (userId, updatedData) => {
  const response = await api.patch(`/users/${userId}`, updatedData);
  return response.data;
};

/**
 * Deleta um usuário do sistema.
 * @param {string} userId - O ID do usuário a ser deletado.
 * @returns {Promise<object>} Uma promise que resolve com uma mensagem de sucesso.
 */
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};