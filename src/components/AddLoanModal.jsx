// src/components/AddLoanModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddLoanModal({ show, handleClose, handleSave, users, books }) {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  
  // Reseta os campos quando o modal é fechado ou aberto
  useEffect(() => {
    if (!show) {
      setUserId('');
      setBookId('');
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !bookId) {
      alert('Por favor, selecione um usuário e um livro.');
      return;
    }
    handleSave({ userId, bookId });
  };

  // Filtra livros para mostrar apenas aqueles com estoque > 0
  const availableBooks = books.filter(book => book.stock > 0);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Empréstimo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formLoanUser">
            <Form.Label>Usuário</Form.Label>
            <Form.Select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">Selecione um usuário...</option>
              {users.map(user => (
                // Mostra todos os usuários, mas a lógica de permissão fica no backend
                <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLoanBook">
            <Form.Label>Livro</Form.Label>
            <Form.Select
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            >
              <option value="">Selecione um livro disponível...</option>
              {availableBooks.map(book => (
                <option key={book.id} value={book.id}>{book.title} (Estoque: {book.stock})</option>
              ))}
            </Form.Select>
            {availableBooks.length === 0 && (
              <Form.Text className="text-muted">
                Nenhum livro com estoque disponível.
              </Form.Text>
            )}
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={availableBooks.length === 0}>
            Salvar Empréstimo
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddLoanModal;