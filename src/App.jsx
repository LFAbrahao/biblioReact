// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Importando componentes e páginas
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Importando as páginas
import Home from './pages/Home';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails';
import AdminDashboard from './pages/AdminDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import ManageBooks from './pages/ManageBooks';
import ManageUsers from './pages/ManageUsers';
import ManageLoans from './pages/ManageLoans';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      {/* A Navbar fica fora do <Routes> para aparecer em todas as páginas */}
      <Navbar />

      {/* O Container do React Bootstrap ajuda a centralizar e alinhar o conteúdo */}
      <Container className="mt-4 mb-4">
        <Routes>
          {/* ======================= */}
          {/* ROTAS PÚBLICAS          */}
          {/* ======================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/livro/:id" element={<BookDetails />} />

          {/* =================================================================== */}
          {/* ALTERAÇÃO PRINCIPAL: A ROTA INICIAL AGORA É PROTEGIDA               */}
          {/* =================================================================== */}
          {/* Qualquer usuário logado (admin, librarian, ou user) poderá ver.   */}
          {/* Se não estiver logado, será redirecionado para /login.            */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          {/* =================================================================== */}


          {/* ======================= */}
          {/* ROTAS PROTEGIDAS - ADMIN */}
          {/* ======================= */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/gerenciar-usuarios" 
            element={
              <ProtectedRoute roles={['admin']}>
                <ManageUsers />
              </ProtectedRoute>
            } 
          />

          {/* =========================== */}
          {/* ROTAS PROTEGIDAS - BIBLIOTECÁRIO */}
          {/* =========================== */}
          <Route 
            path="/bibliotecario/dashboard" 
            element={
              <ProtectedRoute roles={['librarian']}>
                <LibrarianDashboard />
              </ProtectedRoute>
            } 
          />

          {/* ================================================= */}
          {/* ROTA COMPARTILHADA (Admin E Bibliotecário)      */}
          {/* ================================================= */}
          <Route 
            path="/gerenciar-livros" 
            element={
              <ProtectedRoute roles={['admin', 'librarian']}>
                <ManageBooks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/gerenciar-emprestimos" 
            element={
              <ProtectedRoute roles={['admin', 'librarian']}>
                <ManageLoans />
              </ProtectedRoute>
            } 
          />

          {/* Rota para páginas não encontradas (deve ser a última) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;