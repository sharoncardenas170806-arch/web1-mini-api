
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct
} from '../services/product.service.js'

import { createProductSchema, updateProductSchema } from '../utils/schemas.js'

// LISTAR (soporta ?nombre, ?precioMinimo, ?precioMaximo, ?pagina, ?papelera=true|false)
// pageSize ahora viene de la variable de entorno PAGE_SIZE
export async function list (req, res, next) {
  try {
    const {
      nombre,           
      precioMinimo,     
      precioMaximo,     
      pagina = 1,       
      papelera = 'false'
    } = req.query

    const pageSizeFromEnv = Number(process.env.PAGE_SIZE || 10)

    const result = listProducts({
      q: nombre,
      minPrice: precioMinimo,
      maxPrice: precioMaximo,
      page: pagina,
      pageSize: pageSizeFromEnv,
      papelera
    })
    res.json(result)
  } catch (err) { next(err) }
}

// DETALLE (oculta los borrados lógicos)
export async function detail (req, res, next) {
  try {
    const product = getProduct(req.params.id)
    if (!product || product.deleted === true) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(product)
  } catch (err) { next(err) }
}

// CREAR
export async function create (req, res, next) {
  try {
    const { error, value } = createProductSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalles: error.details.map(d => d.message)
      })
    }
    const product = createProduct(value)
    res.status(201).json(product)
  } catch (err) { next(err) }
}

// ACTUALIZAR
export async function update (req, res, next) {
  try {
    const { error, value } = updateProductSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalles: error.details.map(d => d.message)
      })
    }
    const product = updateProduct(req.params.id, value)
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(product)
  } catch (err) { next(err) }
}

// ELIMINAR (borrado lógico -> papelera)
export async function remove (req, res, next) {
  try {
    const ok = deleteProduct(req.params.id)
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' })
    res.status(204).send()
  } catch (err) { next(err) }
}

// RESTAURAR desde la papelera
export async function restore (req, res, next) {
  try {
    const product = restoreProduct(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado o no está en la papelera' })
    }
    res.json(product)
  } catch (err) { next(err) }
}
