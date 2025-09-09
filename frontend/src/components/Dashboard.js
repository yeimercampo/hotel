import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/habitaciones`);
        setHabitaciones(response.data);
      } catch (err) {
        setError('Error al cargar las habitaciones');
      }
    };

    fetchHabitaciones();
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'disponible':
        return 'green';
      case 'ocupada':
        return 'red';
      case 'mantenimiento':
        return 'orange';
      default:
        return 'gray';
    }
  };

  if (selectedRoom) {
    return (
      <div className="dashboard">
        <button className="backButton" onClick={() => setSelectedRoom(null)}>Volver</button>
        <div className="roomDetail">
          <h2>Habitación {selectedRoom.numero}</h2>
          <p><strong>Número:</strong> {selectedRoom.numero}</p>
          <p><strong>Tipo:</strong> {selectedRoom.tipo || 'N/A'}</p>
          <p><strong>Descripción:</strong> {selectedRoom.descripcion || 'N/A'}</p>
          <p><strong>Estado:</strong> {selectedRoom.estado}</p>
          {selectedRoom.imagen_url ? (
            <img className="roomImage" src={selectedRoom.imagen_url} alt={`Habitación ${selectedRoom.numero}`} />
          ) : (
            <p>No hay imagen disponible</p>
          )}
          <p><strong>Precio por noche:</strong> ${selectedRoom.precio_noche}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Dashboard - Habitaciones del Hotel</h1>
      {error && <p className="error">{error}</p>}
      <div className="roomGrid">
        {habitaciones.map((habitacion) => (
          <div
            key={habitacion.id}
            className="roomCard"
            onClick={() => setSelectedRoom(habitacion)}
          >
            <h3>Habitación {habitacion.numero}</h3>
            <p style={{ color: getEstadoColor(habitacion.estado) }}>
              Estado: {habitacion.estado}
            </p>
            <p>Precio por noche: ${habitacion.precio_noche}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
