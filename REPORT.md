
# Implementación de un Pipeline de Integración Continua

> **Objetivo**: Comprender paso a paso cómo implementar un pipeline de integración continua usando Git, Node.js, Jest, Docker y Jenkins.

---

## 🌱 1. Estructura del Proyecto

Tu proyecto debe tener una estructura ordenada como esta:

```
js-project/
├── app.js             # Código principal de la aplicación
├── app.test.js        # Pruebas unitarias con Jest
├── db.json            # Base de datos simulada (json-server)
├── Dockerfile         # Imagen de Docker para levantar el proyecto
├── package.json       # Dependencias y scripts de Node.js
└── Jenkinsfile        # Define el pipeline de CI para Jenkins
```

---

## ⚙️ 2. Configuración del Proyecto Node.js

### `package.json`

Este archivo define las dependencias y scripts del proyecto. Asegúrate de incluir:

```json
{
  "name": "js-project",
  "version": "1.0.0",
  "description": "Proyecto de integración continua con Node.js",
  "main": "app.js",
  "scripts": {
    "start": "json-server --watch db.json --port 3000",
    "test": "jest --coverage"
  },
  "dependencies": {
    "json-server": "^0.17.3"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

### Instalación

```bash
npm install
```

---

## 🧪 3. Código fuente y pruebas

### `app.js`

```js
// app.js - Funciones simples para demostrar pruebas unitarias

function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

module.exports = { suma, resta };
```

### `app.test.js`

```js
// app.test.js - Pruebas unitarias con Jest

const { suma, resta } = require('./app');

test('suma correcta', () => {
  expect(suma(2, 3)).toBe(5);
});

test('resta correcta', () => {
  expect(resta(5, 2)).toBe(3);
});
```

---

## 🐳 4. Dockerfile

```dockerfile
# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos del proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
```

---

## 🧪 5. Jenkinsfile

Este archivo define las etapas de integración continua.

```groovy
pipeline {
  agent any

  stages {
    stage('Instalar dependencias') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test y cobertura') {
      steps {
        sh 'npm test -- --coverage'
      }
    }

    stage('Docker Build & Run') {
      steps {
        sh 'docker build -t js-app .'
        sh 'docker run -d -p 8083:3000 js-app'
      }
    }
  }
}
```

---

## 📁 6. Reporte de cobertura

Jest genera un reporte HTML en `coverage/lcov-report/index.html`. Puedes abrir este archivo en un navegador para visualizar la cobertura de pruebas.

---

## 🧪 7. Jenkins: Configuración del Job

1. Crear un nuevo pipeline en Jenkins.
2. Fuente del repositorio: `file:///ruta/al/proyecto/js-project`
3. Jenkins buscará el `Jenkinsfile` y ejecutará las etapas automáticamente.

---

## 📝 Consejos Finales

- Siempre confirma que tus pruebas pasen antes de subir al repositorio.
- Asegúrate de que el puerto `3000` no esté ocupado si estás usando Docker.
- Puedes detener el contenedor con:  
  ```bash
  docker ps          # para ver el ID del contenedor  
  docker stop <ID>   # para detenerlo
  ```

---

## 📚 Recursos Extra

| Tema | Recurso |
|------|---------|
| Docker básico | https://docker-curriculum.com |
| Jest (Testing) | https://jestjs.io/docs/getting-started |
| Jenkins (CI/CD) | https://www.jenkins.io/doc/ |

---

Con esta guía podrás implementar paso a paso un pipeline de integración continua en un proyecto Node.js. ¡A seguir aprendiendo! 🚀
