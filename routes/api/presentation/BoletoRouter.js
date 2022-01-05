const { BoletoUseCase } = require('../domain/BoletoUseCase')

// Presentation
class BoletoRouter {
  async route (req, res) {
    const barCode = req.params.barCode
    try {
      //  Validar Código de Barras
      const resultado = await new BoletoUseCase().validarBoleto(barCode)
      // Tratamento da resposta HTTP
      console.log(resultado[0].isValid)
      if (resultado[0].isValid === true) {
        res.status(200).json(resultado[1])
      } else {
        res.status(400).json(resultado[2])
      }
    } catch (erro) {
      res.status(400).send(erro.message)
    }
  }
}
exports.BoletoRouter = BoletoRouter
