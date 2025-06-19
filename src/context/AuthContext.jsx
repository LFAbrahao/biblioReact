import { createContext, useContext, useState, useEffect } from 'react'

// Criação do contexto
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Simula persistência com localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Função de login
  const login = (userData) => {
    // Exemplo de userData:
    // { id: 1, nome: 'Maria', role: 'admin' }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Função de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Verifica se está autenticado
  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para facilitar o uso do contexto
export function useAuth() {
  return useContext(AuthContext)
}
 