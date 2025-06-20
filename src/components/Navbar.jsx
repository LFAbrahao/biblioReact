// src/components/Navbar.jsx

import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/authService'; // Importe a função de logout

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken'); // Verifica se há um token no localStorage

  const handleLogout = () => {
    logout(); // Limpa o token
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Minha Biblioteca</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            {isLoggedIn && (
              <>
                {/* Links específicos para usuários logados */}
                <Nav.Link as={Link} to="/gerenciar-livros">Gerenciar Livros</Nav.Link>
                <Nav.Link as={Link} to="/gerenciar-usuarios">Gerenciar Usuários</Nav.Link>
                <Nav.Link as={Link} to="/admin/dashboard">Admin</Nav.Link> {/* Exemplo de link específico */}
                <Nav.Link as={Link} to="/bibliotecario/dashboard">Bibliotecário</Nav.Link> {/* Exemplo */}
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button variant="outline-danger" onClick={handleLogout} className="ms-lg-2">
                Sair
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">Entrar</Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;