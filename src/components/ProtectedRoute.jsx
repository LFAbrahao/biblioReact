// src/components/ProtectedRoute.jsx

import React from 'react';
// A importação do Navigate não é mais necessária temporariamente
// import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roles }) {
  // =================================================================
  // CÓDIGO ORIGINAL (COMENTADO PARA NÃO PERDER)
  // =================================================================
  /*
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role;

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    // Se a rota exige certas roles e o usuário não as possui, nega o acesso
    return <div>Acesso negado. Você não tem permissão para acessar esta página.</div>;
  }
  */
  // =================================================================

  // MÁGICA PARA DESABILITAR A AUTENTICAÇÃO:
  // Simplesmente renderiza qualquer componente filho que a rota protegida deveria mostrar.
  return children;
}

export default ProtectedRoute;