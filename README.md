# Teste Técnico para vaga de Desenvolvedor FullStack Junior na empresa ewally

## Instalação
```console
npm install
```
## Execução em Desenvolvimento
```console
npm run server
```
## Execução em Produção
```console
npm run start
```
## Execução de Testes
```console
npm run test
```

## Utilização
A API recebe requisições HTTP GET no endpoint /boleto. A linha de código digitável do boleto deve ser passada como parãmetro na URI.
### Exemplo
1. Boletos de Títulos bancários 
* http://localhost:8080/boleto/03399852516250002869118013001013788580000029000

2. Boletos de Convênios
* http://localhost:8080/boleto/85890000024408303591202110060300000364742508

### Resposta
A resposta do servidor em caso de sucesso recebe um status 200 no cabeçalho HTTP de resposta e um objeto JSON no seguinte formato:


```json
{
    "barCode": "03399852516250002869118013001013788580000029000",
    "amount": "290.00",
    "expirationDate": "6/1/2022"
}
```

Em caso de erro na validação, o servidor responderá com status 400 no cabeçalho HTTP da resposta e um objeto JSON no seguinte formato:

```json
{
    "erros": {
        "qtdDigitos": "A linha digitável fornecida não possui 47 dígitos."
    }
}
```
## Descrição do Projeto: 
API RESTful para validação de boletos  
## Requisitos:
O teste consiste em escrever um programa em Node.js que expõe uma API na qual é dada
como entrada uma linha digitada de um boleto e que retorna:
* status: 200 para linha válida ou 400 para linha inválida
* amount: O valor do boleto, se existir
* expirationDate: A data de vencimento do boleto, se existir
* barCode: Os 44 dígitos correspondentes ao código de barras desse boleto

## Ferramentas utilizadas em desenvolvimento: 
### Padrões de Código JavaScript
* [StandardJS](https://standardjs.com/) - Formata e corrige códigos Javascript ao salvá-los
* [lint-staged](https://github.com/okonet/lint-staged) - Para executar o standard  arquivos na adicionados para a staged area
* [Husky](https://typicode.github.io/husky) - Utilzada para executar o lint Staged ao realizar commits no repositório.

### Testes
* [Jest](https://jestjs.io/) - Framework de testes para a linguagem JavaScript

