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

## Dependencias

### Dependencias esenciales
Estas son necesarias para el funcionamiento básico del backend:

- **fastapi**: Framework para construir APIs rápidas y seguras.
- **uvicorn**: Servidor ASGI para ejecutar FastAPI.
- **sqlalchemy**: ORM para la gestión de la base de datos.
- **psycopg2-binary**: Driver para conectar con PostgreSQL.
- **python-dotenv**: Manejo de variables de entorno.

### Dependencias adicionales (opcionales)
Para funcionalidades avanzadas como autenticación JWT, migraciones de base de datos, etc.:

- **pydantic**: Validación de datos (incluido automáticamente con FastAPI).
- **python-jose**: Manejo de JWT para autenticación.
- **bcrypt**: Hash de contraseñas.
- **alembic**: Migraciones de base de datos.
- **passlib**: Librería adicional para hash de contraseñas.

Instala las dependencias con el siguiente comando:

```bash
pip install -r requirements.txt
```

O instala manualmente las dependencias esenciales:

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
```

Para funcionalidades adicionales como JWT, instala las dependencias opcionales cuando sea necesario.

## Recomendaciones adicionales

- Usa **DBeaver** como cliente para administrar la base de datos PostgreSQL.
- Para el frontend, se recomienda React con TailwindCSS, Axios y librerías para reportes como Recharts, SheetJS y jsPDF.

---

**Documentación completa y endpoints disponibles en el archivo**  
`Hotel documentacion de
