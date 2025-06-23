// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, roles }) {
  const { user, isAuthenticated } = useAuth();

  // Verifica se o usuário está autenticado
  if (!isAuthenticated()) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se roles foram especificadas, verifica se o usuário tem permissão
  if (roles && roles.length > 0) {
    const userRole = user?.role;
    
    // Mapeia roles do frontend para backend para compatibilidade
    const roleMapping = {
      'librarian': 'bibliotecaria',
      'bibliotecaria': 'bibliotecaria',
      'admin': 'admin',
      'user': 'user'
    };

    const mappedUserRole = roleMapping[userRole] || userRole;
    const hasPermission = roles.some(role => {
      const mappedRole = roleMapping[role] || role;
      return mappedRole === mappedUserRole;
    });

    if (!hasPermission) {
      // Se a rota exige certas roles e o usuário não as possui, nega o acesso
      return (
        <div className="alert alert-danger text-center">
          <h4>Acesso Negado</h4>
          <p>Você não tem permissão para acessar esta página.</p>
          <p>Seu nível de acesso: <strong>{userRole}</strong></p>
          <p>Níveis necessários: <strong>{roles.join(', ')}</strong></p>
        </div>
      );
    }
  }

  // Se passou por todas as verificações, renderiza o componente
  return children;
}

export default ProtectedRoute;