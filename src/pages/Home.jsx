// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import * as bookService from '../api/bookService';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';

function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        // Passa o termo de busca para a função da API
        const data = await bookService.getAllBooks({ search: searchTerm });
        setBooks(data);
        setError(null);
      } catch (err) {
        setError('Falha ao buscar os livros. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // Usamos um timeout para esperar o usuário parar de digitar antes de buscar (debounce)
    const debounceTimer = setTimeout(() => {
      fetchBooks();
    }, 500); // Espera 500ms

    // Limpa o timeout se o usuário digitar novamente
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]); // Re-executa o efeito quando o termo de busca muda

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Catálogo de Livros</h1>
          <Form.Control
            type="text"
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      
      {!error && books.length === 0 && (
        <Alert variant="info">Nenhum livro encontrado com o termo "{searchTerm}".</Alert>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;