const validaTitulos = (barCode) => {
  const resposta = [
    {
      isValid: true
    },
    {
      barCode,
      amount: '',
      expirationDate: ''
    },
    {
      erros: {}
    }
  ]
  // Realizar testes
  return false
}

const validaConvenios = (barCode) => {
  const resposta = [
    {
      isValid: true
    },
    {
      barCode,
      amount: '',
      expirationDate: ''
    },
    {
      erros: {}
    }
  ]
  // Realizar testes
  return resposta
}
// Domain
class BoletoUseCase {
  async validarBoleto (barCode) {
    let resposta = {}
    try {
      const primDigito = Number(barCode[0])
      if (primDigito === 8) {
        console.log('Retorno quando é chamado o validaConvenios. Layer Domínio')
        resposta = validaConvenios(barCode)
      } else {
        console.log('Retorno quando é chamado o validaTitulos. Layer Domínio')
        resposta = validaTitulos(barCode)
      }

      return (resposta)
    } catch (erro) {
      console.log('retorno do catch do validaBoleto. Layer Domínio')
      return (erro.message)
    }
  }
}
exports.BoletoUseCase = BoletoUseCase
