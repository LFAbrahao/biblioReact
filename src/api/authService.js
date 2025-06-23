// src/api/authService.js

const API_URL = 'http://localhost:3000'; // URL do seu back-end

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials), // { email: '...', password: '...' }
  });

  if (!response.ok) {
    // Lança um erro se a resposta não for OK (ex: status 401, 404, 500)
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha no login');
  }

  // Se a resposta for OK, retorna os dados do usuário e token
  const data = await response.json();
  
  // Armazena o token no localStorage para uso em requisições futuras
  if (data.access_token) {
    localStorage.setItem('authToken', data.access_token);
  }
  
  // Retorna o usuário e token
  return { 
    user: data.user,
    token: data.access_token 
  }; 
};

export const logout = async () => {
  // Remove o token do localStorage
  localStorage.removeItem('authToken');
  console.log("Função de logout da API foi chamada.");
  return Promise.resolve();
};