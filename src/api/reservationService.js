

import api from './api';

/**
 * Busca todas as reservas.
 * 
 * @returns {Promise<Array>} Uma promise que resolve com a lista de reservas.
 */
export const getReservations = async () => {
  const response = await api.get('/reservations');
  return response.data;
};

/**
 * Cria uma nova reserva.
 * O payload agora inclui a 'reservationDate' conforme esperado pelo backend.
 * @param {object} reservationData - Dados da reserva, como { userId, bookId }.
 * @returns {Promise<object>} Uma promise que resolve com os dados da reserva criada.
 */
export const createReservation = async (reservationData) => {
  const reservationPayload = {
    ...reservationData,
    reservationDate: new Date().toISOString(),
  };
  const response = await api.post('/reservations', reservationPayload);
  return response.data;
};

/**
 * Atualiza o status de uma reserva.
 * Esta função agora é mais genérica para lidar com diferentes mudanças de status.
 * @param {string} reservationId - O ID da reserva a ser atualizada.
 * @param {string} status - O novo status (ex: 'returned', 'cancelled').
 * @returns {Promise<object>} Uma promise que resolve com os dados da reserva atualizada.
 */
export const updateReservationStatus = async (reservationId, status) => {
  const response = await api.patch(`/reservations/${reservationId}`, { status });
  return response.data;
};