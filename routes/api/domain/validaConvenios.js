const { verificaDVMod10 } = require('./modules/verificaDVMod10')
const { verificaDVMod11 } = require('./modules/verificaDVMod11')

// Função para Tratamento de Boletos de arrecadação de Convênios
const validaConvenios = (barCode) => {
  const resposta = [
    {
      isValid: false
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
  resposta[1].amount = (Number(barCode.substring(4, 13))).toFixed(2) // Associa o valor do boleto ao objeto resultado
  const dia = barCode.substring(26, 28)
  const mes = barCode.substring(24, 26)
  const ano = barCode.substring(20, 24)
  resposta[1].expirationDate = `${dia}/${mes}/${ano}`

  const codigoMoeda = Number(barCode[2])
  // Função para gerar blocos e retornar um objeto com a sequencia do bloco e o digito verificador
  const blocos = Array.from({ length: 4 }, (v, index) => {
    const start = (11 * (index)) + index
    const end = (11 * (index + 1)) + index
    return {
      sequencia: barCode.substring(start, end),
      DV: barCode.substring(end, end + 1)
    }
  })

  if (codigoMoeda === 6 || codigoMoeda === 7) {
    blocos.forEach((bloco, ind) => {
      if (verificaDVMod10(blocos[ind].sequencia) !== Number(bloco.DV)) {
        resposta[2].erros.dv = `O campo ${ind + 1} e seu respectivo Dígito Verificador são inválidos`
      } else {
        resposta[0].isValid = true
      }
    })
  } else if (codigoMoeda === 8 || codigoMoeda === 9) {
    blocos.forEach((bloco, ind) => {
      if (verificaDVMod11(blocos[ind].sequencia) !== Number(bloco.DV)) {
        resposta[2].erros.dv = `O campo ${ind + 1} e seu respectivo Dígito Verificador são inválidos`
      } else {
        resposta[0].isValid = true
      }
    })
  }
  return resposta
}
// exports.validaConvenios = validaConvenios

console.log(validaConvenios('85890000024408303591202110060300000364742508'))
