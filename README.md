# Web1 Mini API (Productos)

API REST ejemplar para **Ingeniería Web 1** (Node.js + Express) que implementa un CRUD de productos con buenas prácticas, documentación OpenAPI/Swagger, pruebas automatizadas y pipeline de CI.

## Características

- **Arquitectura clara (Controller–Service–Route–Model mínimo)**  
- **Validación y seguridad básica** (Helmet, rate-limit opcional, manejo de errores centralizado)   
- **Pruebas automatizadas** con Jest + Supertest (cobertura)  
- **CI en GitHub Actions** (lint, test, coverage)  
- **Dockerfile** para ejecución en contenedor  
- **Paginación y filtros** en el listado

---

## Estructura del proyecto

```
src/
  app.js                # App Express
  server.js             # Bootstrap servidor
  controllers/          # Capa HTTP (entra/sale)
    product.controller.js
  services/             # Reglas de negocio
    product.service.js
  routes/               # Endpoints REST
    docs.routes.js
    product.routes.js
  middlewares/          # Validación, errores, auth
    error.js
  utils/                # Esquemas, helpers
    schemas.js
docs/
  openapi.json          # Especificación OpenAPI 3
tests/
  app.test.js           # Pruebas de integración
.github/workflows/
  ci.yml                # Lint + Test + Coverage
Dockerfile
.eslintrc.json
.gitignore
package.json
README.md
```

---

## Puesta en marcha

### Requisitos
- **Node.js ≥ 18**
- **npm ≥ 9**  


### Variables de entorno (`.env`)
Copia `.env.example` o define:
```
PORT=3000
PAGE_SIZE=10

# Auth básica para POST/PUT/DELETE
BASIC_USER=admin
BASIC_PASS=admin123
```

### Instalación y ejecución

```bash
# 1) Instalar dependencias
npm install

# 2) Desarrollo (con reload)
npm run dev

# 3) Producción
npm start
```

La API quedará en: `http://localhost:3000`  
La documentación Swagger: `http://localhost:3000/docs`

---

##  Pruebas y calidad

```bash
# Ejecutar pruebas
npm test

# Ver cobertura (carpeta coverage/)
npm run test:coverage

# Lint
npm run lint
```

---

## Ejecutar con Docker

```bash
# Construir imagen
docker build -t web1-mini-api .

# Correr contenedor
docker run --name web1-mini-api -p 3000:3000 --env-file .env web1-mini-api
```

---

## Autenticación

Las operaciones de **escritura** requieren **Basic Auth**:
- Usuario: `BASIC_USER`
- Contraseña: `BASIC_PASS`

Enviar el header:
```
Authorization: Basic base64(usuario:contraseña)
```

---

## Endpoints principales

- `GET /salud` → estado del servicio  
- `GET /api/productos` → listar productos (con filtros y paginación)  
- `GET /api/productos/{id}` → obtener producto por id  
- `POST /api/productos` → crear producto *(requiere Basic Auth)*  
- `PUT /api/productos/{id}` → actualizar producto *(requiere Basic Auth)*  
- `DELETE /api/productos/{id}` → eliminar (borrado lógico a papelera) *(requiere Basic Auth)*  
- `POST /api/productos/{id}/restaurar` → restaurar desde papelera *(requiere Basic Auth)*

### Filtros y paginación (`GET /api/productos`)
Query params soportados:
```
nombre=texto
precioMinimo=50
precioMaximo=300
pagina=1            # por defecto 1
papelera=true|false # ver solo borrados si true
```

---

##  Documentación Swagger/OpenAPI

La especificación está en `docs/openapi.json` y se sirve en:
```
GET /docs
```

En la UI podrás probar requests, ver ejemplos y esquemas.

---

## Arquitectura elegida

**MVC ligero (Controller–Service–Route + Model mínimo)**

- **Controllers**: manejan HTTP (req/res)
- **Services**: reglas de negocio y orquestación
- **Routes**: definen endpoints y middlewares
- **Middlewares**: validación, manejo de errores, auth
- **Utils**: esquemas y helpers reutilizables

**Justificación:** Para un servicio pequeño es simple, mantenible y escalable. Permite crecer hacia una base de datos real sin reescribir controladores (solo cambiando la capa de persistencia).

---

##  Scripts útiles (package.json)

```json
{
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "lint": "eslint .",
    "test": "jest",
    "test:coverage": "jest --coverage"
  }
}
```

---

##  CI con GitHub Actions

Pipeline en `.github/workflows/ci.yml`:
- Instala dependencias
- Ejecuta **lint** y **test**
- Genera **coverage**

Se ejecuta en cada push/PR a `main`.

---

## Licencia

Este proyecto se distribuye bajo licencia **MIT** 

##  Autora

**Sharon Cárdenas** – *Estudiante de 19 años de Ingeniería de Software*  
Proyecto académico para la asignatura **Ingeniería Web 1**.  

