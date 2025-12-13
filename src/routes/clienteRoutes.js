const express = require('express')
const router = express.Router()
const { clientesControllers } = require('../controllers/clienteController')
const { authMiddleware } = require('../middlewares/authMiddleWare')

router.get('/listar', clientesControllers.listarClientes)
router.post('/criar', clientesControllers.criarCliente)
router.post('/login', clientesControllers.login)

router.post('/agendar', authMiddleware, clientesControllers.agendar)

module.exports = router