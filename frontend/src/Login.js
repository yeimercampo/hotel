import React, { useState } from 'react';
import axios from 'axios';

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

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '3rem 1rem',
    },
    formContainer: {
      maxWidth: '28rem',
      width: '100%',
      margin: '2rem 0',
    },
    title: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '1.875rem',
      fontWeight: '800',
      color: '#111827',
    },
    form: {
      marginTop: '2rem',
      marginBottom: '1.5rem',
    },
    inputGroup: {
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      marginBottom: '1rem',
    },
    input: {
      appearance: 'none',
      borderRadius: '0.375rem',
      width: '100%',
      padding: '0.5rem 0.75rem',
      border: '1px solid #d1d5db',
      color: '#111827',
      fontSize: '0.875rem',
      outline: 'none',
    },
    inputFocus: {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 1px #6366f1',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.875rem',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0.375rem',
      backgroundColor: '#4f46e5',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#4338ca',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div>
          <h2 style={styles.title}>
            Iniciar Sesión
          </h2>
        </div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              style={styles.input}
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              required
              style={styles.input}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          {error && (
            <div style={styles.error}>{error}</div>
          )}
          <button
            type="submit"
            style={styles.button}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
