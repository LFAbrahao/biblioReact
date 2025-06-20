// src/pages/LibrarianDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StatCard from '../components/StatCard';
import * as bookService from '../api/bookService';
import Spinner from '../components/Spinner';

function LibrarianDashboard() {
  // Nota: Os dados de "reservados" e "retirados" devem vir da sua API.
  // Aqui, usamos valores fixos como exemplo.
  const [stats, setStats] = useState({
    inStock: 0,
    reserved: 23, // Exemplo
    checkedOut: 58, // Exemplo
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksData = await bookService.getAllBooks();
        setStats(prevStats => ({ ...prevStats, inStock: booksData.length }));
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
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
      <h1>Dashboard do Bibliotecário</h1>
      <p>Visão geral da operação da biblioteca.</p>
      <Row className="g-4 mt-3">
        <Col md={4}>
          <StatCard title="Livros em Estoque" value={stats.inStock} />
        </Col>
        <Col md={4}>
          <StatCard title="Livros Reservados" value={stats.reserved} />
        </Col>
        <Col md={4}>
          <StatCard title="Livros Retirados" value={stats.checkedOut} />
        </Col>
      </Row>
    </Container>
  );
}

export default LibrarianDashboard;