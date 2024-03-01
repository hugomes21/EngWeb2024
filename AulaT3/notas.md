# Aula Teórica 3
Teremos um dataset e a primeira coisa que fazemos será um data cleansing

Após essa limpeza será utilizado por json-server

Existirão pedidos para este servidor como: GET, POST

As mensagens de resposta serão sempre em json como: PUT, DELETE

## /users

- GET /users -> listagem
- GET /users/chave -> esta chave devolverá um user específico
- POST /users -> inserção
- PUT /users/chave -> alteração no user específico
- DELETE /users/chave -> eliminação do user