

import { api } from './apiClient';

/**
 * Busca todos os livros. Pode incluir parâmetros para busca e filtragem.
 * @param {object} params - Parâmetros de query, como { search: 'React', category: 'Tecnologia' }.
 * @returns {Promise<Array>} Uma promise que resolve com um array de livros.
 */
export const getAllBooks = async (params = {}) => {
  // Para parâmetros de query, você pode construir a URL manualmente ou usar URLSearchParams
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `/books?${queryString}` : '/books';
  return api.get(url);
};

/**
 * Busca um único livro pelo seu ID.
 * @param {string} bookId - O ID do livro a ser buscado.
 * @returns {Promise<object>} Uma promise que resolve com os dados do livro.
 */
export const getBookById = async (bookId) => {
  return api.get(`/books/${bookId}`);
};

/**
 * Cria um novo livro no catálogo.
 * @param {object} bookData - Os dados do livro.
 * @returns {Promise<object>} Uma promise que resolve com os dados do livro criado.
 */
export const createBook = async (bookData) => {
  return api.post('/books', bookData);
};

/**
 * Atualiza os dados de um livro existente.
 * @param {string} bookId - O ID do livro a ser atualizado.
 * @param {object} updatedData - Os novos dados do livro.
 * @returns {Promise<object>} Uma promise que resolve com os dados do livro atualizado.
 */
export const updateBook = async (bookId, updatedData) => {
  return api.patch(`/books/${bookId}`, updatedData);
};

/**
 * Deleta um livro do catálogo.
 * @param {string} bookId - O ID do livro a ser deletado.
 * @returns {Promise<object>} Uma promise que resolve com uma mensagem de sucesso.
 */
export const deleteBook = async (bookId) => {
  return api.delete(`/books/${bookId}`);
};

/**
 * Busca estatísticas dos livros (estoque, reservados, retirados).
 * @returns {Promise<object>} Uma promise que resolve com as estatísticas.
 */
export const getStatistics = async () => {
  return await api.getStatistics();
};