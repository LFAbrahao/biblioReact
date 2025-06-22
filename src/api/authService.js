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

  // Se a resposta for OK, retorna os dados do usuário
  const data = await response.json();
  // A API agora retorna o usuário sem a senha, então podemos retornar o objeto diretamente.
  return { user: data }; 
};


// ===== CÓDIGO ADICIONADO =====
// Adicionamos e exportamos a função de logout.
export const logout = async () => {
  // Por enquanto, esta função não precisa fazer nada. A lógica principal
  // de remover o usuário do localStorage já está no AuthContext.
  // No futuro, ela poderia ser usada para chamar uma rota no backend
  // para invalidar um token, por exemplo.
  console.log("Função de logout da API foi chamada.");
  return Promise.resolve(); // Retorna uma promessa que resolve imediatamente.
};
// =============================