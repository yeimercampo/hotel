from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.models.producto import Producto
from backend.database import get_db
from backend.schemas.producto import ProductoCreate, ProductoUpdate, Producto
from typing import List

router = APIRouter()

@router.post("/productos", response_model=Producto)
def crear_producto(producto: ProductoCreate, db: Session = Depends(get_db)):
    nuevo_producto = Producto(**producto.model_dump())
    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)
    return nuevo_producto

@router.get("/productos", response_model=List[Producto])
def listar_productos(db: Session = Depends(get_db)):
    return db.query(Producto).all()

@router.put("/productos/{id}", response_model=Producto)
def actualizar_producto(id: int, producto: ProductoUpdate, db: Session = Depends(get_db)):
    db_producto = db.query(Producto).filter(Producto.id == id).first()
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    update_data = producto.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_producto, key, value)
    db.commit()
    db.refresh(db_producto)
    return db_producto

@router.delete("/productos/{id}")
def eliminar_producto(id: int, db: Session = Depends(get_db)):
    db_producto = db.query(Producto).filter(Producto.id == id).first()
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db.delete(db_producto)
    db.commit()
    return {"ok": True}
