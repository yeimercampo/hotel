import React from 'react';
import './Header.css';

const Header = ({ usuario, onLogout }) => {
  return (
    <header className="header">
      <h1 className="title">🏨 Hotel Manager</h1>
      <nav className="nav">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Habitaciones</a></li>
          <li><a href="#">Productos</a></li>
          {usuario && usuario.rol === 'admin' && (
            <li><a href="#">Usuarios</a></li>
          )}
          <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
