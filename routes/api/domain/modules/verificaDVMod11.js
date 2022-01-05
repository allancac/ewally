const verificaDVMod11 = (campo) => {
  const codigo = campo.split('').reverse()
  let multiplicador = 2
  const somatorio = codigo.reduce((acumulado, atual) => {
    const soma = Number(atual) * multiplicador
    multiplicador = multiplicador === 9 ? 2 : multiplicador + 1
    return acumulado + soma
  }, 0)
  const resto = somatorio % 11

  if (resto === 0 || resto === 1) {
    return 0
  }
  if (resto === 10) {
    return 1
  }
  return 11 - resto
}

exports.verificaDVMod11 = verificaDVMod11
