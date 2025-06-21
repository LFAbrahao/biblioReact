import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import * as bookService from '../api/bookService';
import AddEditBookModal from '../components/AddEditBookModal';
import placeholderImage from '../assets/react.svg'; // Usando o placeholder local

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null); 

  useEffect(() => {
    fetchBooks();
  }, []);
  
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar os livros.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBook(null);
  };

  const handleShowAddModal = () => {
    setEditingBook(null);
    setShowModal(true);
  };
  
  const handleShowEditModal = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleSaveBook = async (bookData) => {
    try {
      if (editingBook) {
        console.log(`1. TENTANDO ATUALIZAR: ID=${editingBook.id}, com os seguintes dados:`, bookData);
        await bookService.updateBook(editingBook.id, bookData);
      } else {
        await bookService.createBook(bookData);
      }
      handleCloseModal();
      fetchBooks();
    } catch (err) {
        alert('Falha ao salvar o livro. Verifique o console para mais detalhes.');
        console.error(err);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gerenciar Livros</h1>
        <Button variant="primary" onClick={handleShowAddModal}>Adicionar Novo Livro</Button>
      </div>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título</th>
            <th>Autor</th>
            {/* 1. CABEÇALHO DA NOVA COLUNA */}
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>
                <img 
                  src={book.imageUrl || placeholderImage} 
                  alt={book.title} 
                  style={{ width: '50px', height: 'auto' }} 
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              {/* 2. CÉLULA COM O DADO DO ESTOQUE */}
              <td>{book.stock}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleShowEditModal(book)}
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(book.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddEditBookModal 
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveBook}
        initialData={editingBook}
      />
    </div>
  );
}

export default ManageBooks;