from fastapi import FastAPI
from backend.routes import usuarios, habitaciones, productos
from backend.database import engine, Base

app = FastAPI()
app.include_router(usuarios)
app.include_router(habitaciones)
app.include_router(productos)

# Crear las tablas (solo para desarrollo, en producción usar Alembic)
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"mensaje": "Backend del Sistema de Gestión Hotelera funcionando correctamente"}
