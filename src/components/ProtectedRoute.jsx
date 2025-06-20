// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roles }) {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Supondo que os dados do usuário (incluindo a role) são salvos ao logar

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    // Se a rota exige certas roles e o usuário não as possui, pode redirecionar para uma página de "Não Autorizado"
    return <div>Acesso negado. Você não tem permissão para acessar esta página.</div>;
    // Ou você pode redirecionar para outra página, como a Home:
    // return <Navigate to="/" />;
  }

  // Se estiver autenticado e a role for permitida (se especificada), renderiza o componente filho
  return children;
}

export default ProtectedRoute;