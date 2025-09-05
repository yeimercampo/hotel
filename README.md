# Sistema de Gestión Hotelera – Backend

Este proyecto es el backend para la gestión de reservas, habitaciones, usuarios, productos y finanzas de un hotel. Utiliza **FastAPI** como framework principal y **PostgreSQL** como base de datos.

## Descripción

El sistema permite:
- Autenticación y gestión de usuarios con roles.
- Administración de habitaciones y huéspedes.
- Registro de ocupaciones (check-in/check-out).
- Gestión de productos y ventas.
- Registro de egresos y generación de informes financieros.

La arquitectura recomendada es:
```
React (Frontend) → FastAPI (Backend) → PostgreSQL (Base de datos)
```

## Dependencias necesarias

Instala las siguientes dependencias en tu entorno Python para el backend:

- **fastapi**: Framework para construir APIs rápidas y seguras.
- **uvicorn**: Servidor ASGI para ejecutar FastAPI.
- **sqlalchemy**: ORM para la gestión de la base de datos.
- **alembic**: Migraciones de base de datos.
- **psycopg2-binary**: Driver para conectar con PostgreSQL.
- **python-jose**: Manejo de JWT para autenticación.
- **bcrypt**: Hash de contraseñas.
- **pydantic**: Validación de datos.
- **python-dotenv**: Manejo de variables de entorno.

Instala todo con el siguiente comando:

```bash
pip install fastapi uvicorn sqlalchemy alembic psycopg2-binary python-jose bcrypt pydantic python-dotenv
```

O si tienes un archivo `requirements.txt`:

```bash
pip install -r requirements.txt
```

## Recomendaciones adicionales

- Usa **DBeaver** como cliente para administrar la base de datos PostgreSQL.
- Para el frontend, se recomienda React con TailwindCSS, Axios y librerías para reportes como Recharts, SheetJS y jsPDF.

---

**Documentación completa y endpoints disponibles en el archivo**  
`Hotel documentacion de
