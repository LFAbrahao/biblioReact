// src/components/StatCard.jsx

import React from 'react';
import { Card } from 'react-bootstrap';

function StatCard({ title, value, icon }) {
  return (
    <Card>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <Card.Title className="mb-1">{title}</Card.Title>
          <Card.Text className="fs-4">{value}</Card.Text>
        </div>
        {icon && <div className="fs-3">{icon}</div>}
      </Card.Body>
    </Card>
  );
}

export default StatCard;