// src/components/Navbar.jsx

import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; //  1. IMPORTE O HOOK useAuth

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); //  2. USE O CONTEXTO PARA OBTER O USUÁRIO E A FUNÇÃO LOGOUT

  // 3. A LÓGICA DE LOGIN AGORA É BASEADA NO ESTADO DO CONTEXTO
  const isLoggedIn = !!user; 

  const handleLogout = () => {
    logout(); //  4. CHAME A FUNÇÃO LOGOUT DO CONTEXTO
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Minha Biblioteca</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* O link de Início sempre aparece */}
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            
            {/* Links que só aparecem se o usuário estiver logado */}
            {isLoggedIn && (
              <>
                {/* Você pode adicionar lógicas de role aqui também */}
                {(user.role === 'admin' || user.role === 'librarian') && (
                  <Nav.Link as={Link} to="/gerenciar-livros">Gerenciar Livros</Nav.Link>
                )}
                
                {(user.role === 'admin' || user.role === 'librarian') && (
                  <Nav.Link as={Link} to="/gerenciar-emprestimos">Gerenciar Empréstimos</Nav.Link>
                )}
                
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin/gerenciar-usuarios">Gerenciar Usuários</Nav.Link>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            {isLoggedIn ? (
              <Button variant="outline-secondary" onClick={handleLogout}>
                Sair
              </Button>
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