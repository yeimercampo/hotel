import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <div className="App">
      {usuario ? (
        <Dashboard usuario={usuario} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
