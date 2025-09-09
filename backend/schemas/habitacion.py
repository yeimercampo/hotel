from pydantic import BaseModel
from typing import Optional

class HabitacionBase(BaseModel):
    numero: str
    estado: str
    precio_noche: float
    tipo: Optional[str] = None
    descripcion: Optional[str] = None
    imagen_url: Optional[str] = None

class HabitacionCreate(HabitacionBase):
    pass

class HabitacionUpdate(BaseModel):
    numero: Optional[str] = None
    tipo: Optional[str] = None
    descripcion: Optional[str] = None
    estado: Optional[str] = None
    precio_noche: Optional[float] = None
    imagen_url: Optional[str] = None

class Habitacion(HabitacionBase):
    id: int

    class Config:
        from_attributes = True
