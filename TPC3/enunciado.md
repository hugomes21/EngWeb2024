# TPC 3
Dataset dos filmes americanos (rep fihas jcr)

Filmes:
    cast *
    genre *
    title
    year

Listagem + consultas

1. Análise do dataset e criação de DB em json (json-server)
2. Serviço que responde na porta XXXX às seguintes rotas:
   - GET /filmes -> listagem dos filmes | cada entrada é link para a pág. do filme
   - /filmes/idFilme 
   - /genres
   - /genres/idGen -> cada entrada é link para a pág. do género
   - /ator
   - /ator/idAtor -> cada entrada é link para a pág. do género