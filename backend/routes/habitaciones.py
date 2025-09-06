from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.models.habitacion import Habitacion
from backend.database import get_db
from backend.schemas.habitacion import HabitacionCreate, HabitacionUpdate, Habitacion
from typing import List

router = APIRouter()

@router.post("/habitaciones", response_model=Habitacion)
def crear_habitacion(habitacion: HabitacionCreate, db: Session = Depends(get_db)):
    nueva_habitacion = Habitacion(**habitacion.model_dump())
    db.add(nueva_habitacion)
    db.commit()
    db.refresh(nueva_habitacion)
    return nueva_habitacion

@router.get("/habitaciones", response_model=List[Habitacion])
def listar_habitaciones(db: Session = Depends(get_db)):
    return db.query(Habitacion).all()

@router.put("/habitaciones/{id}", response_model=Habitacion)
def actualizar_habitacion(id: int, habitacion: HabitacionUpdate, db: Session = Depends(get_db)):
    db_habitacion = db.query(Habitacion).filter(Habitacion.id == id).first()
    if not db_habitacion:
        raise HTTPException(status_code=404, detail="Habitación no encontrada")
    update_data = habitacion.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_habitacion, key, value)
    db.commit()
    db.refresh(db_habitacion)
    return db_habitacion

@router.delete("/habitaciones/{id}")
def eliminar_habitacion(id: int, db: Session = Depends(get_db)):
    db_habitacion = db.query(Habitacion).filter(Habitacion.id == id).first()
    if not db_habitacion:
        raise HTTPException(status_code=404, detail="Habitación no encontrada")
    db.delete(db_habitacion)
    db.commit()
    return {"ok": True}
