# Task Manager API

## Descripción
Esta aplicación permite gestionar tareas a través de un backend en Node.js y un frontend desarrollado en React.

---

## **Enlaces**

- [Frontend desplegado](https://task-manager-mu-eosin-93.vercel.app/)
- [Backend desplegado](https://taskmanager-wntk.onrender.com)

---

## Pasos para instalar y ejecutar el proyecto localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/miusuario/miproyecto.git
   cd miproyecto
   ```

2. **Instalar dependencias:**
   Asegúrate de tener Node.js y npm instalados en tu sistema.
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   DB_USER=postgres
   DB_PASSWORD=wemadeit
   DB_HOST=localhost
   PORT=3001
   ```

4. **Ejecutar la base de datos:**
   Configura y ejecuta tu base de datos (por ejemplo, PostgreSQL o MongoDB) para que esté disponible en el host y puerto especificados en las variables de entorno.

5. **Levantar el servidor:**
   ```bash
   npm start
   ```

6. **Ver la documentación Swagger UI:**
   Una vez que el servidor esté en funcionamiento, accede a la documentación de la API en:
   [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

## Detalles de configuración

### Variables de entorno
Asegúrate de configurar correctamente las siguientes variables de entorno:

| Variable      | Descripción                              |
|---------------|------------------------------------------|
| `DB_USER`     | Usuario de la base de datos             |
| `DB_PASSWORD` | Contraseña de la base de datos          |
| `DB_HOST`     | Host donde está corriendo la base de datos |
| `PORT`        | Puerto en el que correrá el servidor    |

### Archivos clave

- `src/app.js`: Configuración principal del servidor y middlewares.
- `src/routes/`: Contiene las rutas de la API.
- `src/swagger/swagger.json`: Archivo con la especificación OpenAPI para Swagger UI.

  Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js (v16 o superior)
- npm (v8 o superior)

## 🚀 Instalación y ejecución local

Sigue los pasos a continuación para instalar y ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd task-manager-frontend
