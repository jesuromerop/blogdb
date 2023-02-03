# BlogDB

Aplicación de blog que contiene registro e inicio de sesión de usuario, creación, edición y eliminación de publicaciones y edición de perfil

## Pasos para instalar

- Clonar el repositorio
- Restaurar la base de datos MySQL
- npm install en frontend/blog y server/
- Crear un archivo .env en frontend/blog con la siguiente información:
```
REACT_APP_BACKEND_URL= (variable de entorno que contiene la URL y puerto para conectarse al backend)
```
- Crear un archivo .env en server/ con la siguiente información:
```
HOST= (IP de la base de datos)
PORT= (puerto de la base de datos)
DB_USER= (usuario de la abase de datos)
DB_PASSWORD= (contraseña de la base de datos)
DATABASE= (nombre de la base de datos)
JWT_SIGNATURE= (firma del JWT, se puede generar con el comando: openssl rand -hex 32 )
SERVER_PORT= (puerto en el que va a correr el backend)
```