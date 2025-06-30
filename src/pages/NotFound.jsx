

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="text-center" style={{ marginTop: '100px' }}>
      <h1>404</h1>
      <h2>Página Não Encontrada</h2>
      <p>A página que você está procurando não existe ou foi movida.</p>
      <Button as={Link} to="/" variant="primary">Voltar para a Página Inicial</Button>
    </Container>
  );
}

export default NotFound;