import request from 'supertest'
import app from '../src/app.js'

describe('API en español', () => {
  it('salud debe responder ok', async () => {
    const res = await request(app).get('/salud')
    expect(res.statusCode).toBe(200)
    expect(res.body.estado).toBe('ok')
  })

  it('lista productos', async () => {
    const res = await request(app).get('/api/productos')
    expect(res.statusCode).toBe(200)
    expect(res.body.items.length).toBeGreaterThan(0)
    expect(res.body.total).toBeGreaterThan(0)
  })

  it('crea un producto con auth básica', async () => {
    const payload = { name: 'Cámara', price: 199.99, stock: 2 }
    const res = await request(app)
      .post('/api/productos')
      .auth(process.env.BASIC_USER || 'admin', process.env.BASIC_PASS || 'admin123')
      .send(payload)
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe('Cámara')
  })

  it('rechaza creación sin auth', async () => {
    const res = await request(app).post('/api/productos').send({ name: 'X', price: 1 })
    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe('No autorizado')
  })
})
