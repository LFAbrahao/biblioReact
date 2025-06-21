// src/components/Navbar.jsx

import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../api/authService'; // Podemos comentar isso por enquanto

function Navbar() {
  const navigate = useNavigate();
  
  // AQUI ESTÁ A MUDANÇA:
  // Comente a verificação real e force o valor para 'true'
  // const isLoggedIn = !!localStorage.getItem('authToken'); 
  
  const isLoggedIn = true; // << FORÇADO PARA TESTES

  const handleLogout = () => {
    // A função de logout pode ser desativada ou mantida, mas não terá muito efeito agora
    // logout(); 
    localStorage.clear(); // Limpa tudo para simular um logout
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
                <Nav.Link as={Link} to="/gerenciar-livros">Gerenciar Livros</Nav.Link>
                {/* ADICIONE O NOVO LINK ABAIXO */}
                <Nav.Link as={Link} to="/gerenciar-emprestimos">Gerenciar Empréstimos</Nav.Link>
                <Nav.Link as={Link} to="/admin/gerenciar-usuarios">Gerenciar Usuários</Nav.Link>
                <Nav.Link as={Link} to="/admin/dashboard">Admin</Nav.Link>
                <Nav.Link as={Link} to="/bibliotecario/dashboard">Bibliotecário</Nav.Link>
              </>
            )}
          </Nav>
          {/* ... restante do componente ... */}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;