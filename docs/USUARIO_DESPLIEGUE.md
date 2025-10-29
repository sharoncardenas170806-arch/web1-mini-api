# Guía de usuario y despliegue

## Introducción
Este servicio expone un CRUD de productos con autenticación básica para operaciones de escritura.

## Requisitos
- Node 18+ o Docker

## Instalación
1. `cp .env.example .env` y ajusta credenciales.
2. `npm install`
3. `npm run dev` o `npm start`

## Uso rápido
- `GET /health`
- `GET /api/products`
- `POST /api/products` (Basic Auth)
- `PUT /api/products/:id` (Basic Auth)
- `DELETE /api/products/:id` (Basic Auth)
- `GET /docs` para Swagger

## Pruebas
`npm test` para correr Jest + Supertest. Se genera cobertura.

## CI/CD
El pipeline (`.github/workflows/ci.yml`) ejecuta:
- Lint
- Tests con cobertura
- (opcional) puedes añadir un paso de despliegue a tu plataforma de pruebas.

## Despliegue con Docker
```bash
docker build -t web1-mini-api .
docker run -p 3000:3000 --env-file .env web1-mini-api
```

