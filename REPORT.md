
# Desafío Sistema de Gestión de Tareas

> **Objetivo**: Comprender paso a paso cómo implementar un pipeline de integración continua usando Git, Node.js, Jest, Docker y Jenkins para un sistema de gestión de tareas.

---

## 🌱 1. Estructura del Proyecto

Tu proyecto debe tener una estructura ordenada como esta:

```
desafio-sistema-tareas/
├── src            
  ├── app.js             # Código principal de la aplicación
├── tests            
  ├── app.test.js        # Pruebas unitarias con Jest
├── Dockerfile         # Imagen de Docker para levantar el proyecto
└── package.json       # Dependencias y scripts de Node.js
```

---

## ⚙️ 2. Configuración del Proyecto Node.js

### `package.json`

Este archivo define las dependencias y scripts del proyecto. Asegúrate de incluir:

```json
{
  "name": "repositoriodesafiolatam",
  "version": "1.0.0",
  "description": "Integrantes: - Eduardo Hernández - Nicolás Chávez",
  "main": "app.js",
  "scripts": {
    "test": "jest --forceExit --silent=false --coverage",
    "dev": "nodemon src/app.js",
    "start": "node src/app.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/NicoDizel/desafio-sistema-tareas.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/NicoDizel/desafio-sistema-tareas/issues"
  },
  "homepage": "https://github.com/NicoDizel/desafio-sistema-tareas#readme",
  "dependencies": {
    "express": "^4.21.2",
    "nodemon": "^3.1.9"
  },
  "devDependencies": {
    "jest": "^29.4.1",
    "supertest": "^6.3.3"
  }
}

```

### Instalación

```bash
npm install
```

---

## 🧪 3. Código fuente y pruebas

### `src/app.js`

```js
// app.js - Endpoints para el sistema de gestión de tareas

app.get('/', (req, res) => {
    res.send('Welcome to the task manager API');
});

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
});
```

### `test/app.test.js`

```js
// tests/app.test.js - Pruebas unitarias con Jest

const request = require('supertest');
const app = require('../src/app.js');

describe('API Tests', () => {
  it('should return a 200 status code', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should return a list of users', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should return a single user', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Task 1');
  });
});

```

---

## 🐳 4. Dockerfile

```dockerfile
# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /usr/src

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
```

---

## 📁 5. Reporte de cobertura

Jest genera un reporte HTML en `coverage/lcov-report/index.html`. Puedes abrir este archivo en un navegador para visualizar la cobertura de pruebas.

---

## 🧪 6. Jenkins: Configuración del Job

1. Crear un nuevo pipeline en Jenkins.
2. Fuente del repositorio: `https://github.com/NicoDizel/desafio-sistema-tareas.git`

---
