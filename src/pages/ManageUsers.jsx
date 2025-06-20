// src/pages/ManageUsers.jsx

import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import * as userService from '../api/userService';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // No mundo real, esta role viria de um Context
  const loggedInUserRole = JSON.parse(localStorage.getItem('user'))?.role;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let data = await userService.getUsers();
        // Se for um bibliotecário, mostre apenas os usuários com a role 'user'
        if (loggedInUserRole === 'librarian') {
            data = data.filter(user => user.role === 'user');
        }
        setUsers(data);
      } catch (err) {
        setError('Falha ao carregar os usuários.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [loggedInUserRole]);

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

  if (isLoading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gerenciar Usuários</h1>
        <Button variant="primary">Adicionar Novo Usuário</Button>
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
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className={`badge bg-${user.role === 'admin' ? 'danger' : user.role === 'librarian' ? 'warning' : 'secondary'}`}>{user.role}</span></td>
              <td>
                <Button variant="info" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)} disabled={user.role === 'admin'}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageUsers;