# Teste Técnico para vaga de Desenvolvedor FullStack Junior na empresa ewally

## Descrição di Projeto: 
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