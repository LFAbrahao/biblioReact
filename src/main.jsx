// src/main.jsx
import './assets/App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Importe o CSS do Bootstrap. Essencial para que os componentes funcionem.
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Importe seus estilos personalizados, se tiver.
import './assets/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);