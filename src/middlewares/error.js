export function notFoundMiddleware (req, res, next) {
  return res.status(404).json({ error: 'No encontrado' })
}

export function errorMiddleware (err, req, res, next) {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Error interno del servidor' })
}
