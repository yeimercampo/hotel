from fastapi import FastAPI
from backend.routes import usuarios, habitaciones, productos
from backend.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios)
app.include_router(habitaciones)
app.include_router(productos)

# Crear las tablas (solo para desarrollo, en producción usar Alembic)
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"mensaje": "Backend del Sistema de Gestión Hotelera funcionando correctamente"}
