const express = require('express')
const router = express.Router()

// @route   GET /boleto/:barCode
// @desc    Rota para validar o código de barra de boletos de títulos bancários e pagamentos de concessionárias
// @access  Public
router.get('/:barCode', async (req, res) => {
  //  Obter o código de brras do parâmetro fornecido na URI do endpoint /boleto
  const barCode = req.params.barCode
  //  Validar Código de Barras

  try {
    res.status(200).json({
      barCode,
      amount: '20.00',
      expirationDate: '2018-07-16'
    })
  } catch (erro) {
    console.log(erro.message)
    res.status(500).send({ erros: [{ msg: 'Erro no servidor.' }] })
  }
})

module.exports = router
