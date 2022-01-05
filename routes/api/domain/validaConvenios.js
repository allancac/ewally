// Função para Tratamento de Boletos de arrecadação de Convênios
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
  resposta[1].amount = (Number(barCode.substring(4, 13))).toFixed(2) // Associa o valor do boleto ao objeto resultado
  const dia = barCode.substring(26, 28)
  const mes = barCode.substring(24, 26)
  const ano = barCode.substring(20, 24)
  resposta[1].expirationDate = `${dia}/${mes}/${ano}`

  // Realizar testes

  return resposta
}
exports.validaConvenios = validaConvenios

// console.log(validaConvenios('85890000024408303591202110060300000364742508'))
