// src/api/bookService.js

import api from './api';

/**
 * Busca todos os livros. Pode incluir parâmetros para busca e filtragem.
 * @param {object} params - Parâmetros de query, como { search: 'React', category: 'Tecnologia' }.
 * @returns {Promise<Array>} Uma promise que resolve com um array de livros.
 */
export const getAllBooks = async (params = {}) => {
  const response = await api.get('/books', { params });
  return response.data;
};

/**
 * Busca um único livro pelo seu ID.
 * @param {string} bookId - O ID do livro a ser buscado.
 * @returns {Promise<object>} Uma promise que resolve com os dados do livro.
 */
export const getBookById = async (bookId) => {
  const response = await api.get(`/books/${bookId}`);
  return response.data;
};

/**
 * Cria um novo livro no catálogo.
 * @param {FormData} bookData - Os dados do livro, possivelmente como FormData para incluir upload de imagem.
 * @returns {Promise<object>} Uma promise que resolve com os dados do livro criado.
 */
export const createBook = async (bookData) => {
  // Usar 'Content-Type': 'multipart/form-data' é importante para uploads de arquivos.
  // O Axios geralmente faz isso automaticamente se você passar um objeto FormData.
  const response = await api.post('/books', bookData);
  return response.data;
};

/**
 * Atualiza os dados de um livro existente.
 * @param {string} bookId - O ID do livro a ser atualizado.
 * @param {object} updatedData - Os novos dados do livro.
 * @returns {Promise<object>} Uma promise que resolve com os dados do livro atualizado.
 */
export const updateBook = async (bookId, updatedData) => {
  const response = await api.patch(`/books/${bookId}`, updatedData);
  return response.data;
};

/**
 * Deleta um livro do catálogo.
 * @param {string} bookId - O ID do livro a ser deletado.
 * @returns {Promise<object>} Uma promise que resolve com uma mensagem de sucesso.
 */
export const deleteBook = async (bookId) => {
  const response = await api.delete(`/books/${bookId}`);
  return response.data;
};