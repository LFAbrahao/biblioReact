// src/contexts/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Tenta carregar o usuário do localStorage ao iniciar
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  const login = async (credentials) => {
    try {
      const { user: loggedInUser, token } = await apiLogin(credentials);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      // O token já é armazenado no authService
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    // Chama a função de logout da API que remove o token
    apiLogout();
    localStorage.removeItem('user');
    setUser(null);
  };

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('authToken');
  };

  // Função para obter o token
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const value = { 
    user, 
    login, 
    logout, 
    isAuthenticated,
    getToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Este é o hook que sua Navbar e outros componentes usarão
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};