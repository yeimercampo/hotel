from sqlalchemy import Column, Integer, String, Float, Text
from backend.database import Base

class Habitacion(Base):
    __tablename__ = "habitaciones"
    id = Column(Integer, primary_key=True, index=True)
    numero = Column(String(10), unique=True, nullable=False)
    estado = Column(String(20), nullable=False)  # Ejemplo: disponible, ocupada, mantenimiento
    precio_noche = Column(Float, nullable=False)
    foto = Column(Text, nullable=True)  # URL o base64
