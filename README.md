# Bank - API

## Rodando a aplicação

caso não queira clonar o repositório você pode rodar a imagem docker `docker pull leocavachini/bankapi-api`

1. Clone o repositório

- `git clone https://github.com/LeonardoCavachini/BankApi.git`

- adicione um arquivo `.env` com as seguintes vaiaveis de ambiente.

DB_PASS=`senha para o banco`

DB_USER=`nome user`

DB_NAME=`nome do banco`

PORT=`ex:3001`

HOST=`sera usado como nome do container`

DATABASE_URL=`postgresql://${DB_USER}:${DB_PASS}@${HOST}:5432/${DB_NAME}?shemas=public`

Este projeto precisa do docker para subr o banco de dados e aplicação, no seu terminal digite `docker compose up `.
Prontinho agora você ja pode brincar com a aplicação.
caso não tenha o **Docker** instalado, acesse [Docker](https://www.docker.com/) para mais detalhes.

## Endpoints

registar usuario `http://localhost:3001/register`.
method: POST
body = `{username: user@user.com, password: A15ghj2}`


logar usuario `http://localhost:3001/login`.
method: POST
body = `{username: user@user.com, password: A15ghj2}`

Para o usuario ver seu saldo precisa fornecer um token.
checar seu saldo de conta `http://localhost:3001/account/:username`.
method: POST
headers: Authorization Token


Para o usuario fazer um transação ele precisa fornecer um token.
Fazer transação `http://localhost:3001/transation`.
method: POST
headers: Authorization Token

Para o usuario ver suas transações ele precisa fornecer um token.
Ver suas transações `http://localhost:3001/transation/detail/:username`.
method: POST
headers: Authorization Token
obs:Lemnrado que o username é o email do usuário.

Para o usuario filtrar suas transações ele precisa fornecer um token.
Ver suas transações `http://localhost:3001/transation/filter?accountDebit=160d5c30-e05b-43a8-accf-da6a53eaf6d4`.
method: POST
headers: Authorization Token
O usuario pode filtrar por: accountDebit, accontCredit, date.
deve ser feito por query Params onde para contas de pasar o id, no caso, de datas, deve ser nesse formato`2022-11-01`
