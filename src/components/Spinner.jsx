// src/components/Spinner.jsx

import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

function Spinner({ size = 'md', animation = 'border', variant = 'primary' }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <BootstrapSpinner animation={animation} variant={variant} size={size} />
      <span className="visually-hidden">Carregando...</span>
    </div>
  );
}

export default Spinner;