const express = require('express')
const app = express()

// MiddleWare do Body Parser nativo do ExpressJS
app.use(express.json({ extended: false }))

// Importação das rotas da API
const boleto = require('./routes/api/boleto')

// Disponibilização das rotas pelo servidor
app.use('/boleto', boleto)

// Tratamento para requisições inválidas
app.use((req, res, next) => {
  // const erro = new Error('Rota não encontrada ou inexistente')
  res.status(404).json({ erro: 'Rota não encontrada ou inexistente' })
  next()
})

// Server Listening Service
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}.`)
})
