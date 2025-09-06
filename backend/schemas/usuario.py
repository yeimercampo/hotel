from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UsuarioBase(BaseModel):
    nombre: str
    correo: EmailStr
    contrasena: str
    rol: str

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[EmailStr] = None
    contrasena: Optional[str] = None
    rol: Optional[str] = None

class Usuario(UsuarioBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
