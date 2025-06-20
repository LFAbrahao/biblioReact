// src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import StatCard from '../components/StatCard';
import * as userService from '../api/userService';
import * as bookService from '../api/bookService';
import Spinner from '../components/Spinner';

function AdminDashboard() {
  const [stats, setStats] = useState({ userCount: 0, bookCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Busca dados de usuários e livros em paralelo para mais eficiência
        const [usersData, booksData] = await Promise.all([
          userService.getUsers(),
          bookService.getAllBooks(),
        ]);
        setStats({
          userCount: usersData.length,
          bookCount: booksData.length,
        });
      } catch (err) {
        setError('Falha ao carregar as estatísticas.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <h1>Dashboard do Administrador</h1>
      <p>Visão geral do sistema.</p>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-4 mt-3">
        <Col md={6}>
          <StatCard title="Total de Usuários" value={stats.userCount} />
        </Col>
        <Col md={6}>
          <StatCard title="Total de Livros no Catálogo" value={stats.bookCount} />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;