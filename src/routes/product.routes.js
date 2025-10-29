import { Router } from 'express'
import * as product from '../controllers/product.controller.js'
import { basicAuth } from '../middlewares/auth.js'

const router = Router()

router.get('/productos', product.list) // admite ?papelera=true
router.get('/productos/:id', product.detail)
router.post('/productos', basicAuth, product.create)
router.put('/productos/:id', basicAuth, product.update)
router.delete('/productos/:id', basicAuth, product.remove)

// NUEVO: restaurar desde la papelera
router.post('/productos/:id/restaurar', basicAuth, product.restore)

export default router
