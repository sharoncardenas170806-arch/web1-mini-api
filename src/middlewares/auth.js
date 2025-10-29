export function basicAuth (req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.split(' ')[1] || ''
  const [user, pass] = Buffer.from(token || '', 'base64').toString().split(':')

  if (user === process.env.BASIC_USER && pass === process.env.BASIC_PASS) {
    return next()
  }
  res.set('WWW-Authenticate', 'Basic realm="Área Segura"')
  return res.status(401).json({ error: 'No autorizado' }) // <-- antes decía "Unauthorized"
}
