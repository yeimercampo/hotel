import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <div style={{ padding: '20px' }}>
        <button onClick={() => setSelectedRoom(null)} style={{ marginBottom: '20px' }}>Volver</button>
        <h2>Habitación {selectedRoom.numero}</h2>
        <p><strong>Número:</strong> {selectedRoom.numero}</p>
        <p><strong>Tipo:</strong> {selectedRoom.tipo || 'N/A'}</p>
        <p><strong>Descripción:</strong> {selectedRoom.descripcion || 'N/A'}</p>
        <p><strong>Estado:</strong> {selectedRoom.estado}</p>
        {selectedRoom.foto ? (
          <img src={selectedRoom.foto} alt={`Habitación ${selectedRoom.numero}`} style={{ maxWidth: '400px', width: '100%', borderRadius: '8px' }} />
        ) : (
          <p>No hay imagen disponible</p>
        )}
        <p><strong>Precio por noche:</strong> ${selectedRoom.precio_noche}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard - Habitaciones del Hotel</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {habitaciones.map((habitacion) => (
          <div
            key={habitacion.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer'
            }}
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
