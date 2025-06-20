import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import * as bookService from '../api/bookService';
import AddEditBookModal from '../components/AddEditBookModal';
import placeholderImage from '../assets/react.svg'; // Usando o placeholder local

function ManageBooks() {
  // --- ESTADOS DO COMPONENTE ---
  
  // Armazena a lista de livros vinda da API
  const [books, setBooks] = useState([]);
  
  // Controla a exibição do spinner de carregamento
  const [isLoading, setIsLoading] = useState(true);
  
  // Armazena mensagens de erro, se houver
  const [error, setError] = useState(null);
  
  // Controla se o modal está visível ou não
  const [showModal, setShowModal] = useState(false);
  
  // Guarda os dados do livro que está sendo editado. Se for 'null', significa que estamos adicionando um novo livro.
  const [editingBook, setEditingBook] = useState(null); 


  // --- EFEITOS E CARREGAMENTO DE DADOS ---
  
  // useEffect para buscar os livros assim que o componente é montado
  useEffect(() => {
    fetchBooks();
  }, []);
  
  // Função para buscar os livros da API e atualizar o estado
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


  // --- FUNÇÕES DE MANIPULAÇÃO DE EVENTOS (HANDLERS) ---
  
  // Lida com a exclusão de um livro
  const handleDelete = async (bookId) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await bookService.deleteBook(bookId);
        // Atualiza a lista de livros no frontend sem precisar buscar tudo de novo
        setBooks(books.filter(book => book.id !== bookId));
      } catch (err) {
        alert('Falha ao excluir o livro.');
      }
    }
  };

  // Fecha o modal e reseta o estado de edição
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBook(null);
  };

  // Abre o modal em modo "Adicionar" (sem dados iniciais)
  const handleShowAddModal = () => {
    setEditingBook(null);
    setShowModal(true);
  };
  
  // Abre o modal em modo "Editar", passando os dados do livro selecionado
  const handleShowEditModal = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  // Lida com o salvamento (criação ou atualização) de um livro
  const handleSaveBook = async (bookData) => {
    try {
      // Se 'editingBook' tiver dados, atualizamos o livro existente
      if (editingBook) {
        console.log(`1. TENTANDO ATUALIZAR: ID=${editingBook.id}, com os seguintes dados:`, bookData);
        await bookService.updateBook(editingBook.id, bookData);
      } else {
        // Se 'editingBook' for nulo, criamos um novo livro
        await bookService.createBook(bookData);
      }
      handleCloseModal(); // Fecha o modal após salvar
      fetchBooks(); // Recarrega a lista para exibir as alterações
    } catch (err) {
        alert('Falha ao salvar o livro. Verifique o console para mais detalhes.');
        console.error(err);
    }
  };


  // --- RENDERIZAÇÃO DO COMPONENTE ---

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