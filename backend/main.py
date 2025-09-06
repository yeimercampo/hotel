from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

app = FastAPI()

# Cargar variables de entorno
load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "1234")
DB_NAME = os.getenv("DB_NAME", "bd_hotel")

DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelo ejemplo: Usuario
class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    rol = Column(String)

# Crear tablas (solo para desarrollo)
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"mensaje": "Backend del Sistema de Gestión Hotelera funcionando correctamente"}

@app.get("/usuarios")
def listar_usuarios():
    db = SessionLocal()
    usuarios = db.query(Usuario).all()
    db.close()
    return [
        {"id": u.id, "nombre": u.nombre, "email": u.email, "rol": u.rol}
        for u in usuarios
    ]