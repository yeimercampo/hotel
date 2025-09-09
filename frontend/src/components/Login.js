import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios/login`, {
        correo,
        contrasena,
      });
      localStorage.setItem('usuario', JSON.stringify(response.data));
      onLogin(response.data);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <div>
          <h2 className="title">
            Iniciar Sesión
          </h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              id="correo"
              name="correo"
              type="email"
              required
              className="input"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              required
              className="input"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          {error && (
            <div className="error">{error}</div>
          )}
          <button
            type="submit"
            className="button"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
