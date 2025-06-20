// src/pages/ManageBooks.jsx

import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import * as bookService from '../api/bookService';

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
      } catch (err) {
        setError('Falha ao carregar os livros.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await bookService.deleteBook(bookId);
        setBooks(books.filter(book => book.id !== bookId));
      } catch (err) {
        alert('Falha ao excluir o livro.');
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gerenciar Livros</h1>
        <Button variant="primary">Adicionar Novo Livro</Button> {/* Lógica do Modal/Formulário viria aqui */}
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td><img src={book.coverImage || 'https://via.placeholder.com/50'} alt={book.title} style={{ width: '50px' }} /></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(book.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageBooks;