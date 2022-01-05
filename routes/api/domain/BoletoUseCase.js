const { validaConvenios } = require('./validaConvenios')
const { validaTitulos } = require('./validaTitulos')

// Domain
class BoletoUseCase {
  async validarBoleto (barCode) {
    let resposta = {}
    try {
      const primDigito = Number(barCode[0])
      // Verificação se é um boleto de convênios ou de Títulos
      if (primDigito === 8) {
        resposta = validaConvenios(barCode)
      } else {
        resposta = validaTitulos(barCode)
      }
      // Retorna um objeto com o resultado para o layer de apresentação.
      return resposta
    } catch (erro) {
      return (erro.message)
    }
  }
}
exports.BoletoUseCase = BoletoUseCase
