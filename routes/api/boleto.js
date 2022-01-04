const express = require('express')
const router = express.Router()
const { BoletoRouter } = require('./presentation/BoletoRouter')

// @route   GET /boleto/:barCode
// @desc    Rota para validar o código de barra de boletos de títulos bancários e pagamentos de concessionárias
// @access  Public
router.get('/:barCode', new BoletoRouter().route)

module.exports = router
