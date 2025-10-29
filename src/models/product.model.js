let _id = 3
export const products = [
  { id: 1, name: 'Mouse', price: 49.9, stock: 10, description: 'Mouse óptico', deleted: false },
  { id: 2, name: 'Teclado', price: 89.0, stock: 5, description: 'Teclado mecánico', deleted: false },
  { id: 3, name: 'Audífonos', price: 120.0, stock: 3, description: 'Diadema over-ear', deleted: false }
]

export function nextId () {
  _id += 1
  return _id
}
