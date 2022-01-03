const express = require('express');
const app = express();


// MiddleWare do Body Parser nativo do ExpressJS
app.use(express.json({ extended: false }));

//Importação das rotas da API
const boleto = require('./routes/api/boleto');

// Disponibilização das rotas pelo servidor 
app.use('/boleto', boleto);

// Server Listening Service
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}.`)
});