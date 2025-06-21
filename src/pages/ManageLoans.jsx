// src/pages/ManageLoans.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Spinner, Alert, Badge } from 'react-bootstrap';
// Usando o serviço atualizado
import * as reservationService from '../api/reservationService'; 
import * as userService from '../api/userService';
import * as bookService from '../api/bookService';
import AddLoanModal from '../components/AddLoanModal';

// RECOMENDAÇÃO: Renomeie este componente para ManageReservations
function ManageLoans() { 
  // O estado 'loans' agora conterá 'reservations'
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [reservationsData, usersData, booksData] = await Promise.all([
        reservationService.getReservations(), 
        userService.getUsers(),
        bookService.getAllBooks()
      ]);
      setReservations(reservationsData);
      setUsers(usersData);
      setBooks(booksData);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar os dados. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReturn = async (reservationId) => {
    if (window.confirm('Confirmar a devolução deste livro?')) {
      try {
        // ATUALIZADO: Chama a função que muda o status para 'returned'
        await reservationService.updateReservationStatus(reservationId, 'returned'); 
        fetchData(); 
      } catch (err) {
        alert('Falha ao registrar a devolução.');
        console.error(err);
      }
    }
  };

  const handleSaveReservation = async (reservationData) => {
    try {
      await reservationService.createReservation(reservationData); 
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Falha ao criar a reserva.');
      console.error(err);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gerenciar Reservas</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Criar Nova Reserva
        </Button>
      </div>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Usuário</th>
            <th>Data da Reserva</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(res => (
            <tr key={res.id}>
              <td>{res.book?.title || 'Livro não encontrado'}</td>
              <td>{res.user?.name || 'Usuário não encontrado'}</td>
              <td>
                {/* ATUALIZADO: Usa o campo 'reservationDate' */}
                {res.reservationDate 
                  ? new Date(res.reservationDate).toLocaleDateString()
                  : 'N/D'
                }
              </td>
              <td>
                {/* ATUALIZADO: Lógica baseada no campo 'status' */}
                <Badge bg={res.status === 'pending' ? 'warning' : res.status === 'returned' ? 'success' : 'secondary'}>
                  {res.status}
                </Badge>
              </td>
              <td>
                {/* ATUALIZADO: Ação só aparece se o status for 'pending' */}
                {res.status === 'pending' && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleReturn(res.id)}
                  >
                    Marcar como Devolvido
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* RECOMENDAÇÃO: Renomeie este componente para AddReservationModal */}
      <AddLoanModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveReservation}
        users={users}
        books={books}
      />
    </div>
  );
}

export default ManageLoans;