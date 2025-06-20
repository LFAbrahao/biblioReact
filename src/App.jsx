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
import NotFound from './pages/NotFound';

// Supondo que você tenha um AuthProvider para gerenciar o estado do usuário.
// Se ainda não tiver, pode começar sem ele e adicionar depois.
// import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    // <AuthProvider>  // <-- Você envolveria tudo com seu Contexto de Autenticação aqui
      <BrowserRouter>
        {/* A Navbar fica fora do <Routes> para aparecer em todas as páginas */}
        <Navbar />

        {/* O Container do React Bootstrap ajuda a centralizar e alinhar o conteúdo */}
        <Container className="mt-4 mb-4">
          <Routes>
            {/* ======================= */}
            {/* ROTAS PÚBLICAS     */}
            {/* ======================= */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/livro/:id" element={<BookDetails />} />

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
            {/* ROTA COMPARTILHADA (Admin E Bibliotecário) */}
            {/* ================================================= */}
            <Route 
              path="/gerenciar-livros" 
              element={
                <ProtectedRoute roles={['admin', 'librarian']}>
                  <ManageBooks />
                </ProtectedRoute>
              } 
            />

            {/* Rota para páginas não encontradas (deve ser a última) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        {/* Você poderia adicionar um <Footer /> aqui também */}
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;