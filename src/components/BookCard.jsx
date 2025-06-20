// src/components/BookCard.jsx

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <Card className="h-100">
      <Link to={`/livro/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {book.coverImage && (
          <Card.Img variant="top" src={book.coverImage} alt={book.title} style={{ height: '200px', objectFit: 'cover' }} />
        )}
        {!book.coverImage && (
          <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
            Sem Imagem
          </div>
        )}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-1">{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
          <Card.Text className="mb-auto" style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {book.description || 'Sem descrição disponível.'}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default BookCard;