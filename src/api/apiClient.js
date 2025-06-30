

const API_URL = 'http://localhost:3000';

// Função helper para fazer requisições autenticadas
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Adiciona o token de autorização se existir
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${url}`, config);

  // Se o token expirou ou é inválido, redireciona para login
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Token expirado. Faça login novamente.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro ${response.status}`);
  }

  return response;
};


export const api = {
  
  get: async (url) => {
    const response = await makeAuthenticatedRequest(url, {
      method: 'GET',
    });
    return response.json();
  },


  post: async (url, data) => {
    const response = await makeAuthenticatedRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

 
  put: async (url, data) => {
    const response = await makeAuthenticatedRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  
  patch: async (url, data) => {
    const response = await makeAuthenticatedRequest(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.json();
  },

 
  delete: async (url) => {
    const response = await makeAuthenticatedRequest(url, {
      method: 'DELETE',
    });
    
    
    if (response.status === 204) {
      return null;
    }
    
    return response.json();
  },

  // Obter estatísticas dos livros
  getStatistics: async () => {
    const data = await api.get('/books/statistics');
    console.log('Estatísticas recebidas da API:', data);
    return data;
  },
};

export default api;
