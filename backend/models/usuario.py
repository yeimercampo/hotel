from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from datetime import datetime
from backend.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(100), unique=True, index=True, nullable=False)
    contrasena = Column(Text, nullable=False)
    rol = Column(String(20), nullable=False)
    fecha_creacion = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
