import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RoomForm from './components/RoomForm';
import Header from './components/Header';
import Footer from './components/Footer';
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
    localStorage.removeItem('usuario');
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        {usuario && <Header usuario={usuario} onLogout={handleLogout} />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={usuario ? <Dashboard usuario={usuario} /> : <Login onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/habitacion/nueva" element={usuario && usuario.rol === 'administrador' ? <RoomForm /> : <Login onLogin={handleLogin} />} />
            <Route path="/habitacion/editar/:id" element={usuario && usuario.rol === 'administrador' ? <RoomForm /> : <Login onLogin={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
