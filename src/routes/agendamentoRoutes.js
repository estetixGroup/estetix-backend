const express = require('express')
const router = express.Router()
const { agendamentoController } = require('../controllers/agendamentoController')
const { authMiddleware } = require('../middlewares/authMiddleWare')


router.post('/criar', authMiddleware, agendamentoController.criar)

module.exports = router