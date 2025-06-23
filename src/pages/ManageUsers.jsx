import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import * as userService from '../api/userService';
import AddEditUserModal from '../components/AddEditUserModal'; // Importe o novo modal

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para controlar o modal
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const loggedInUserRole = JSON.parse(localStorage.getItem('user'))?.role;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar os usuários.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        alert('Falha ao excluir o usuário.');
      }
    }
  };
  
  // --- Funções para controlar o modal ---
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleShowAddModal = () => {
    setEditingUser(null);
    setShowModal(true);
  };
  
  const handleShowEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSaveUser = async (userData) => {
    // Se a senha estiver vazia durante a edição, removemos para não enviar uma senha vazia para o backend
    if (editingUser && !userData.password) {
      delete userData.password;
    }
    
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, userData);
      } else {
        await userService.createUser(userData);
      }
      handleCloseModal();
      fetchUsers();
    } catch (err) {
      // ESTA É A PARTE QUE VAMOS MELHORAR
      console.error("Falha ao salvar o usuário:", err.response); // Log para depuração

      // Verifica se o erro é o de email duplicado (409 Conflict)
      if (err.response && err.response.status === 409) {
        alert(`Erro: ${err.response.data.message}`); // Exibe a mensagem do backend: "Este email já está em uso."
      } else {
        // Mensagem genérica para outros erros
        alert('Falha ao salvar o usuário. Verifique o console para mais detalhes.');
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gerenciar Usuários</h1>
        {/* O botão "Adicionar" agora abre o modal */}
        <Button variant="primary" onClick={handleShowAddModal}>Adicionar Novo Usuário</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Permissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            // Apenas admins podem editar outros admins
            (loggedInUserRole === 'admin' || user.role !== 'admin') && (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className={`badge bg-${user.role === 'admin' ? 'danger' : user.role === 'bibliotecaria' ? 'warning' : 'secondary'}`}>{user.role}</span></td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleShowEditModal(user)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(user.id)} 
                    disabled={user.role === 'admin'} // Impede a exclusão de outros admins
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </Table>

      {/* Renderiza o modal de usuário, passando os estados e funções como props */}
      <AddEditUserModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveUser}
        initialData={editingUser}
      />
    </div>
  );
}

export default ManageUsers;