import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './RoomForm.css';

const RoomForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;
  const roomData = location.state?.room;

  const [formData, setFormData] = useState({
    numero: '',
    estado: 'disponible',
    precio_noche: '',
    tipo: '',
    descripcion: '',
    imagen_url: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && roomData) {
      setFormData({
        numero: roomData.numero,
        estado: roomData.estado,
        precio_noche: roomData.precio_noche,
        tipo: roomData.tipo || '',
        descripcion: roomData.descripcion || '',
        imagen_url: roomData.imagen_url || ''
      });
    }
  }, [isEdit, roomData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await axios.put(`${process.env.REACT_APP_API_URL}/habitaciones/${id}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/habitaciones`, formData);
      }
      navigate('/');
    } catch (err) {
      setError(isEdit ? 'Error al editar la habitación' : 'Error al añadir la habitación');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="roomForm">
      <h1>{isEdit ? 'Editar Habitación' : 'Añadir Habitación'}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Número:</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
          >
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
            <option value="mantenimiento">Mantenimiento</option>
          </select>
        </div>

        <div className="formGroup">
          <label>Precio por noche:</label>
          <input
            type="number"
            name="precio_noche"
            value={formData.precio_noche}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <label>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className="formGroup">
          <label>URL de la imagen:</label>
          <input
            type="text"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleInputChange}
          />
        </div>
      <div className="formButtons" style={{ marginTop: '20px' }}>
        <button type="submit" form="roomForm" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </form>
  </div>
  );
};

export default RoomForm;
