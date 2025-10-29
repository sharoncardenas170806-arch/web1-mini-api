# Web1 Mini API (Productos)

API REST ejemplar para **Ingeniería Web 1** con:
- Estructura clara (controllers, services, routes, middlewares)
- Buenas prácticas (validación, seguridad básica con Helmet y Basic Auth)
- Documentación OpenAPI/Swagger
- Pruebas automatizadas (Jest + Supertest) con cobertura
- CI en GitHub Actions (lint, test, coverage)
- Dockerfile para despliegue local o en un entorno de pruebas

## Arquitectura elegida: MVC ligero (Controller-Service-Model-Route)
**Justificación**: para un servicio pequeño, un **MVC/CSR** (Controller-Service-Route) es suficiente y fácil de mantener. 
Se separa la lógica de negocio (services) de la capa HTTP (controllers/routes) y se abstrae el acceso a datos (models en memoria). 
Permite escalar a una base de datos real sin reescribir controladores.

```
src/
  controllers/   # lógica HTTP
  services/      # reglas de negocio
  routes/        # definición de endpoints
  middlewares/   # validación, auth, manejo de errores
  models/        # fuente de datos (in-memory)
  utils/         # helpers
docs/
  openapi.json   # especificación OpenAPI
tests/
  *.test.js      # pruebas de integración
.github/workflows/ci.yml  # pipeline CI
```

## Requisitos previos
- Node.js >= 18
- npm >= 9

## Instalación y ejecución
```bash
cp .env.example .env   # o define variables de entorno
npm install
npm run dev            # arranque en modo watch
# o
npm start
```

La API corre en `http://localhost:${PORT|3000}`

## Autenticación
Se usa **Basic Auth** para operaciones de escritura (POST/PUT/DELETE). 
Usuario y contraseña por variables de entorno `BASIC_USER` y `BASIC_PASS`.

## Endpoints principales
- `GET /health` — estado del servicio
- `GET /api/products` — lista (paginación y filtros opcionales)
- `GET /api/products/:id` — detalle
- `POST /api/products` — crear (requiere Basic Auth)
- `PUT /api/products/:id` — actualizar (requiere Basic Auth)
- `DELETE /api/products/:id` — eliminar (requiere Basic Auth)
- `GET /docs` — Swagger UI
### Paginación
- La API usa paginación con `PAGE_SIZE` leído desde `.env` (por defecto 10).
- Parámetros del listado: `nombre`, `precioMinimo`, `precioMaximo`, `pagina`, `papelera`.


## Pruebas
```bash
npm test
```
Genera reporte de cobertura en `coverage/` y resultados visibles en CI.

## Docker (opcional)
```bash
docker build -t web1-mini-api .
docker run -p 3000:3000 --env-file .env web1-mini-api
```

## Despliegue (entorno de pruebas)
- Usa el `Dockerfile` o `npm start` en un servicio (Railway/Render/VM).
- Asegura variables de entorno y puerto.
- Revisa CI: `.github/workflows/ci.yml` ejecuta lint, test y coverage.

## Licencia
MIT
