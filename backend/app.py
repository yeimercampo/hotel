import psycopg2
conn = psycopg2.connect(host="localhost",
                        user="postgres",
                        password="1234",
                        dbname="bd_hotel"
                        )
print(conn)
print("Conexión exitosa")

cursor = conn.cursor()
cursor.execute("SELECT * FROM usuarios;")

data = cursor.fetchall()
print(data)

# Backend Hotel

# Este proyecto es el backend para la gestión de reservas y administración de un hotel. Permite crear, consultar, actualizar y eliminar reservas, gestionar habitaciones y usuarios, y ofrece una API RESTful para interactuar con el sistema.

# ## Dependencias necesarias

# Para ejecutar este backend necesitas instalar las siguientes dependencias de Python:

# - **Flask**: Framework para crear la API REST.
# - **SQLAlchemy**: ORM para la gestión de la base de datos.
# - **Flask-Cors**: Permite el manejo de CORS para peticiones desde el frontend.
# - **python-dotenv**: Para manejar variables de entorno.

# Instala todas las dependencias ejecutando:

# ```bash
# pip install flask sqlalchemy flask-cors python-dotenv
# ```

# O si tienes un archivo `requirements.txt`:

# ```bash
# pip install -
# ```