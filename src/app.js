import express from 'express'
import helmet from 'helmet'

import morgan from 'morgan'
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.js'
import productRoutes from './routes/product.routes.js'
import docsRouter from './routes/docs.routes.js'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

// health
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// routes
app.use('/api', productRoutes)
app.use('/docs', docsRouter)

// Alias de salud en español
app.get('/salud', (req, res) => res.json({ estado: 'ok' }))

// Home -> redirige a Swagger (ya lo habías puesto antes)
app.get('/', (req, res) => res.redirect('/docs'))

// Evitar 404 de favicon
app.get('/favicon.ico', (req, res) => res.status(204).end())


// Home -> redirige a Swagger
app.get('/', (req, res) => res.redirect('/docs'))

// Evita el 404 del favicon del navegador
app.get('/favicon.ico', (req, res) => res.status(204).end())

// 404 + error
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app
