import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddEditUserModal({ show, handleClose, handleSave, initialData }) {
  // Objeto inicial para o formulário de um novo usuário
  const defaultFormData = {
    name: '',
    email: '',
    password: '',
    role: 'user', // Define 'user' como o padrão
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (initialData) {
      // Modo de edição: preenche o formulário com os dados existentes.
      // Deixamos a senha em branco por segurança; o usuário digita uma nova se quiser alterar.
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        password: '', // Senha sempre começa em branco no modo de edição
        role: initialData.role || 'user',
      });
    } else {
      // Modo de adição: reseta para o formulário padrão.
      setFormData(defaultFormData);
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              // A senha só é obrigatória ao criar um novo usuário
              required={!initialData} 
              placeholder={initialData ? "Deixe em branco para não alterar" : ""}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formUserRole">
            <Form.Label>Permissão (Role)</Form.Label>
            <Form.Select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="user">Usuário</option>
              <option value="librarian">Bibliotecário</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddEditUserModal;