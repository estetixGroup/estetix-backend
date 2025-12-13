const express = require('express')
const router = express.Router()
const { servicoController } = require('../controllers/servicoController')

router.get('/listar', servicoController.listar)
router.post('/criar', servicoController.criar)

module.exports = router