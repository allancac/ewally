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
        console.log('Retorno de quando o status é 200. Layer Apresentação')
        res.status(200).json(resultado[1])
      } else {
        console.log('Retorno de quando o status é 400. Layer Apresentação')
        res.status(400).json(resultado[2])
      }
    } catch (erro) {
      console.log('retorno do catch do BoletoRouter. Layer Apresentação')
      res.status(400).send(erro.message)
    }
  }
}
exports.BoletoRouter = BoletoRouter
