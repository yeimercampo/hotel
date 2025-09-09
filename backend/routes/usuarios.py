from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.models.usuario import Usuario
from backend.database import get_db
from backend.schemas.usuario import UsuarioCreate, UsuarioUpdate, Usuario, UsuarioLogin, UsuarioResponse
from typing import List

router = APIRouter()

@router.post("/usuarios", response_model=Usuario)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    nuevo_usuario = Usuario(**usuario.model_dump())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

@router.get("/usuarios", response_model=List[Usuario])
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()

@router.put("/usuarios/{id}", response_model=Usuario)
def actualizar_usuario(id: int, usuario: UsuarioUpdate, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id == id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    update_data = usuario.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_usuario, key, value)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@router.delete("/usuarios/{id}")
def eliminar_usuario(id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id == id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_usuario)
    db.commit()
    return {"ok": True}

@router.post("/usuarios/login", response_model=UsuarioResponse)
def login_usuario(login_data: UsuarioLogin, db: Session = Depends(get_db)):
    from backend.models.usuario import Usuario as UsuarioModel
    db_usuario = db.query(UsuarioModel).filter(UsuarioModel.correo == login_data.correo).first()
    if not db_usuario or db_usuario.contrasena != login_data.contrasena:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")
    # Return only user data without password by creating a copy and setting contrasena to None
    user_data = db_usuario.__dict__.copy()
    user_data['contrasena'] = None
    return user_data
