const { verificaDVMod10 } = require('./modules/verificaDVMod10')

// Função para Tratamento de Boletos de Títulos Bancários
const validaTitulos = (barCode) => {
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

  resposta[1].amount = (Number(barCode.substring(barCode.length - 10)) / 100.00).toFixed(2) // Associa o valor do boleto ao objeto resultado
  const fatorDataVenc = Number(barCode.substring(33, 37)) // Número Real com o fator de correção da data de vencimento
  const date = new Date('10/07/1997') // Data base de vencimento pre-definida
  date.setTime(date.getTime() + (fatorDataVenc * 24 * 60 * 60 * 1000)) // converte o fator de ventimento de dia para milisegundos
  resposta[1].expirationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` // associa a data formatada ao objeto resultado

  // Realizar testes
  // Verifica se o código posssui 47 dígitos
  if (barCode.length !== 47) {
    resposta[2].erros.qtdDigitos = 'A linha digitável fornecida não possui 47 dígitos.'
    return resposta
  } else if (barCode.match(/^[0-9]+$/) === null) {
    resposta[2].erros.qtdDigitos = 'A linha digitável deve conter apenas caracteres numéricos.'
    return resposta
  } else {
    /**
        A representação numérica do código de barras é composta, por cinco campos, sendo os
        três primeiros amarrados por DVs e calculados pelo módulo 10, conforme segue:
        a) O módulo 10 deverá ser utilizado para calcular o DV dos 03 (três) primeiros campos
        da linha digitável;
    */
    // Separar os 3 campos de código
    const campos = [
      {
        sequencia: barCode.substring(0, 9),
        DV: barCode.substring(9, 10)
      },
      {
        sequencia: barCode.substring(10, 20),
        DV: barCode.substring(20, 21)
      },
      {
        sequencia: barCode.substring(21, 31),
        DV: barCode.substring(31, 32)
      }
    ]

    // Validar cada campo com o dígito verificador
    if (verificaDVMod10(campos[0].sequencia) !== Number(campos[0].DV)) {
      resposta[2].erros.dv = 'O campo 1 e seu respectivo Dígito Verificador são inválidos'
    } else {
      resposta[0].isValid = true
    }

    if (verificaDVMod10(campos[1].sequencia) !== Number(campos[1].DV)) {
      resposta[2].erros.dv = 'O campo 2 e seu respectivo Dígito Verificador são inválidos'
    } else {
      resposta[0].isValid = true
    }

    if (verificaDVMod10(campos[2].sequencia) !== Number(campos[2].DV)) {
      resposta[2].erros.dv = 'O campo 3 e seu respectivo Dígito Verificador são inválidos'
    } else {
      resposta[0].isValid = true
    }

    return resposta
  }
}

exports.validaTitulos = validaTitulos
