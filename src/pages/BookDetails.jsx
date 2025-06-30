import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Alert } from 'react-bootstrap';
import * as bookService from '../api/bookService';
import Spinner from '../components/Spinner';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do livro.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!book) {
    return <Alert variant="warning">Livro não encontrado.</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Image src={book.imageUrl || 'https://via.placeholder.com/300x400'} fluid rounded />
        </Col>
        <Col md={8}>
          <h1>{book.title}</h1>
          <h4 className="text-muted">{book.author}</h4>
          <hr />
          <h5>Descrição</h5>
          <p>{book.description || 'Nenhuma descrição fornecida.'}</p>
          
          <p><strong>Gênero:</strong> {book.genre || 'Não especificado'}</p>

          <p><strong>Unidades em Estoque:</strong> {book.stock}</p>

          <hr />
          <Button as={Link} to="/" variant="secondary">Voltar ao Catálogo</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetails;