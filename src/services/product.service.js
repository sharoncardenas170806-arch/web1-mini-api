
import { products, nextId } from '../models/product.model.js'

export function listProducts ({ q, minPrice, maxPrice, page = 1, pageSize = 10, papelera = 'false' }) {
  let filtered = [...products]

  // Papelera: si papelera=true mostramos SOLO borrados; si no, ocultamos borrados
  if (papelera === 'true') {
    filtered = filtered.filter(p => p.deleted === true)
  } else {
    filtered = filtered.filter(p => p.deleted !== true)
  }

  if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(String(q).toLowerCase()))
  if (minPrice != null) filtered = filtered.filter(p => p.price >= Number(minPrice))
  if (maxPrice != null) filtered = filtered.filter(p => p.price <= Number(maxPrice))

  const total = filtered.length
  const start = (Number(page) - 1) * Number(pageSize)
  const items = filtered.slice(start, start + Number(pageSize))
  return { items, total, page: Number(page), pageSize: Number(pageSize) }
}

export function getProduct (id) {
  return products.find(p => p.id === Number(id)) || null
}

export function createProduct (data) {
  const product = { id: nextId(), deleted: false, ...data }
  products.push(product)
  return product
}

export function updateProduct (id, data) {
  const idx = products.findIndex(p => p.id === Number(id) && p.deleted !== true)
  if (idx === -1) return null
  products[idx] = { ...products[idx], ...data }
  return products[idx]
}

export function deleteProduct (id) {
  const prod = products.find(p => p.id === Number(id) && p.deleted !== true)
  if (!prod) return false
  prod.deleted = true
  return true
}

export function restoreProduct (id) {
  const prod = products.find(p => p.id === Number(id) && p.deleted === true)
  if (!prod) return null
  prod.deleted = false
  return prod
}
