const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado.' })
    }

    const tokenPuro = token.startsWith('Bearer ') ? token.slice(7, token.length) : token

    try {
        const decoded = jwt.verify(tokenPuro, SECRET_KEY)
        req.idUsuario = decoded.id
        next()
    } catch (error) {
        res.status(400).json({ error: 'Token inválido.' })
    }
}

module.exports = { authMiddleware }