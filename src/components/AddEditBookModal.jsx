import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Este componente é "controlado" pela página pai através das props.
function AddEditBookModal({ show, handleClose, handleSave, initialData }) {
  // Estado interno para gerenciar os dados do formulário
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    stock: 1,
    genre: '',
    imageUrl: ''
  });

  // useEffect é usado para popular o formulário quando estivermos editando um livro.
  // Ele observa mudanças na prop 'initialData'.
  useEffect(() => {
    if (initialData) {
      // Se há dados iniciais (modo de edição), preenche o formulário
      setFormData(initialData);
    } else {
      // Se não (modo de adição), reseta o formulário para o estado inicial
      setFormData({
        title: '',
        author: '',
        description: '',
        stock: 1,
        genre: '',
        imageUrl: ''
      });
    }
  }, [initialData, show]); // Executa quando o modal abre ou os dados mudam

  // Manipulador genérico para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData); // Envia os dados do formulário para a página pai
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        {/* O título do modal muda se estamos editando ou adicionando */}
        <Modal.Title>{initialData ? 'Editar Livro' : 'Adicionar Novo Livro'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookGenre">
            <Form.Label>Gênero</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBookStock">
            <Form.Label>Estoque</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookImageUrl">
            <Form.Label>URL da Imagem da Capa</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="https://exemplo.com/capa.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
            />
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

export default AddEditBookModal;