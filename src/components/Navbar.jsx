// src/components/Navbar.jsx

import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isLoggedIn = !!user; 

  const handleLogout = () => {
    logout();
    navigate('/login');
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
                {/* Links para admin e bibliotecária */}
                {(user.role === 'admin' || user.role === 'bibliotecaria') && (
                  <Nav.Link as={Link} to="/gerenciar-livros">Gerenciar Livros</Nav.Link>
                )}
                
                {(user.role === 'admin' || user.role === 'bibliotecaria') && (
                  <Nav.Link as={Link} to="/gerenciar-emprestimos">Gerenciar Empréstimos</Nav.Link>
                )}
                
                {/* Link exclusivo para admin */}
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin/gerenciar-usuarios">Gerenciar Usuários</Nav.Link>
                )}

                {/* Dashboard específico por role */}
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin/dashboard">Dashboard Admin</Nav.Link>
                )}
                
                {user.role === 'bibliotecaria' && (
                  <Nav.Link as={Link} to="/bibliotecario/dashboard">Dashboard Bibliotecária</Nav.Link>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            {isLoggedIn ? (
              <>
                <span className="navbar-text me-3">
                  Olá, {user.name} ({user.role})
                </span>
                <Button variant="outline-secondary" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="primary">
                Login
              </Button>
            )}
          </Nav>

        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;