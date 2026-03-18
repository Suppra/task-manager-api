# Task Manager API

API REST para gestión de tareas desarrollada con Node.js, Express y MySQL. Incluye autenticación con JWT, manejo de usuarios y CRUD completo de tareas protegidas por token.

## Tecnologías utilizadas
- Node.js
- Express
- MySQL
- JWT
- bcryptjs
- dotenv
- cors

## Funcionalidades
- Registro de usuarios
- Inicio de sesión con JWT
- Protección de rutas con middleware
- Crear tareas
- Listar tareas del usuario autenticado
- Obtener tarea por ID
- Actualizar tareas
- Eliminar tareas

## Estructura del proyecto
```bash
src/
  config/
  controllers/
  middlewares/
  routes/
  app.js
server.js
```

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Suppra/task-manager-api.git
```

Entrar a la carpeta:

```bash
cd task-manager-api
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo .env:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=task_manager_db
JWT_SECRET=super_secret_key_12345
```

Crear la base de datos en MySQL:

```sql
CREATE DATABASE task_manager_db;

USE task_manager_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

Ejecutar el proyecto:

```bash
npm run dev
```

## Endpoints principales

### Auth

- POST /api/auth/register
- POST /api/auth/login

### Tasks

- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

## Autor

Christian Javier Cañate Yepes
