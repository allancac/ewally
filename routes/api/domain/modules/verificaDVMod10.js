// Função para verificar o digito verificador do primeiro, segundo e terceiro campos
const verificaDVMod10 = (campo) => {
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

exports.verificaDVMod10 = verificaDVMod10
