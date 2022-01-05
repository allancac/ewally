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
  date.setTime(date.getTime() + (fatorDataVenc * 24 * 60 * 60 * 1000)); //converte o fator de ventimento de dia para milisegundos
  resposta[1].expirationDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` // associa a data formatada ao objeto resultado

  // Realizar testes
  // Verifica se o código posssui 47 dígitos

  if (barCode.length !== 47) {
    resposta[2].erros.qtdDigitos = 'A linha digitável fornecida não possui 47 dígitos.'
    return resposta
  }else if(barCode.match(/^[0-9]+$/) === null){
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

    // Função para verificar o digito verificador do primeiro, segundo e terceiro campos
    const verificaDV = (campo) => {
      /**
        b) Os multiplicadores começam com o número 2 (dois), sempre pela direita, alternando-
        se 1 e 2;
    */
      const campoInvertido = campo.split('').reverse()
      // Função que gera o digito verificador. Realiza a soma acumulativa usando cada número do campo
      const somatorio = campoInvertido.reduce((acumulado, atual, indice) => {
        /*
        c) Multiplicar cada algarismo que compõe o número pelo seu respectivo peso
        (multiplicador):
        */
        let soma = Number(atual) * (((indice + 1) % 2) + 1) // Alterna peso entre 2 e 1
        /*
        d) Caso o resultado da multiplicação seja maior que 9 (nove) deverão ser somados os
        algarismos do produto, até reduzi-lo a um único algarismo:
        a. Exemplo: Resultado igual a 18, então 1+8 = 9
        e) Subtrair o total apurado no item anterior, da dezena imediatamente superior ao total
        apurado:
        a. Exemplo: Resultado da soma igual a 25, então 30 - 25
        */
        soma = (soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma)
        return acumulado + soma
      }, 0)
      /*
        f) O resultado obtido será o dígito verificador do número;
        a. Exemplo: 30-25 = 5 então 5 é o Dígito Verificador
        g) Se o resultado da subtração for igual a 10 (dez), o dígito verificador será igual a 0
        (zero).
    */
      return (Math.ceil(somatorio / 10) * 10) - somatorio
    }

    // Validar cada campo com o dígito verificador
    if (verificaDV(campos[0].sequencia) === campos[0].DV) {
      resposta[0].isValid = true
    }else {
      resposta[0].isValid = false
      resposta[2].erros.dv = `O campo 1 e seu respectivo Dígito Verificador são inválidos`
    }

    if (verificaDV(campos[1].sequencia) === campos[1].DV) {
      resposta[0].isValid = true
    } else{
      resposta[0].isValid = false
      resposta[2].erros.dv = `O campo 2 e seu respectivo Dígito Verificador são inválidos`
    }

    if (verificaDV(campos[2].sequencia) !== campos[2].DV) {
      resposta[0].isValid = true
    } else{
      resposta[0].isValid = false
      resposta[2].erros.dv = `O campo 3 e seu respectivo Dígito Verificador são inválidos`
    }
    
    return resposta
  }
}

exports.validaTitulos = validaTitulos
