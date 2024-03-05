var http = require('http');
var fs = require('fs');
var url = require('url');
var axios = require('axios');

http.createServer(function (req, res) {
var q = url.parse(req.url, true);
/* Leitura do ficheiro css para estilizar a página */
if (q.pathname == "/w3.css") {
    fs.readFile('./w3.css', function(err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
    });
} else {    
    var pathParts = q.pathname.split("/");

    if (q.pathname == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write("<head><link rel='stylesheet' type='text/css' href='./w3.css'</head>")
        res.write("<body>");
        res.write("<div class='w3-container w3-teal w3-center'>");
        res.write("<h2>Escolha uma opção</h2>");
        res.write("</div>");
        res.write("<div class='w3-container'>");
        res.write("<p><a href='filmes'>Lista de Filmes</a></p>");
        res.write("<p><a href='generos'>Lista de Géneros</a></p>");
        res.write("<p><a href='atores'>Lista de Atores</a></p>");
        res.write("</div></body>")
        res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>") 
        res.write("<h6>TPC3 - EngWeb2024</h6>");
        res.write("</footer>");
        res.end();
    }
    else if (q.pathname == "/filmes") {
        axios.get('http://localhost:3000/filmes?_sort=title')
            .then(resp => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<head><link rel='stylesheet' type='text/css' href='./w3.css'</head>")
                res.write("<body>");
                res.write("<div class='w3-container w3-teal w3-center'>");
                res.write("<h1>Lista de Filmes</h1>");
                res.write("</div>");
                res.write("<ul class='w3-ul w3-hoverable'>");
                for (i in resp.data) {
                    if (resp.data[i] && resp.data[i].id) {
                        res.write("<li>" + "<a href='filmes/" + resp.data[i].id.$oid + "'>" + resp.data[i].title + "</a></li>");
                    }
                }
                res.write("</ul>");
                res.write("<div class='w3-center'><a href='/'><button class='w3-button w3-teal'>Voltar</button></a></div>")
                res.write("</div></body>")
                res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>") 
                res.write("<h6>TPC3 - EngWeb2024</h6>");
                res.write("</footer>");
                res.end();
            })
            .catch(err => {
                res.write("<p><b>ERRO: </b>" + err + "</p>");
                res.end();
            });
    
    }
    else if (q.pathname.match(/filmes\/f[0-9]+$/)) {
        var id = pathParts[2];
        axios.get('http://localhost:3000/filmes?id.$oid=' + id)
            .then(resp => {
                if (resp.data && resp.data[0]) {
                    var filmeId = resp.data[0].id.$oid; // Aqui está a mudança
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'</head>")
                    res.write("<body>");
                    res.write("<div class='w3-container w3-teal w3-center'>");
                    res.write("<h1>Detalhes do Filme</h1>");
                    res.write("</div>");
                    res.write("<div class='w3-container'>");
                    res.write("<p><b>Título: </b>" + resp.data[0]['title'] + "</p>");
                    res.write("<p><b>Ano: </b>" + resp.data[0]['year'] + "</p>");
                    res.write("<p><b>Elenco: </b>" + resp.data[0].cast.join(', ') + "</p>");
                    res.write("<p><b>Género: </b>" + (resp.data[0].genres.length > 0 ? resp.data[0].genres.join(', ') : 'N/A') + "</p>");
                    res.write("<div class='w3-center'><a href='/filmes'><button class='w3-button w3-teal'>Voltar</button></a></div>")
                    res.write("</div></body>")
                    res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")                    
                    res.write("<h6>TPC3 - EngWeb2024</h6>");
                    res.write("</footer>");
                    res.end();
                }
                else {
                    throw new Error("Filme nao encontrado");
                }
                    
            })
            .catch(err => {
                res.write("<p><b>ERRO: </b>" + err + "</p>");
                res.end();
            });
    }
    else if (q.pathname == "/generos") {
        axios.get('http://localhost:3000/generos?_sort=genres')
        .then(resp => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write("<head><link rel='stylesheet' type='text/css' href='./w3.css'</head>")
            res.write("<body>");
            res.write("<div class='w3-container w3-teal w3-center'>");
            res.write("<h1>Lista de Géneros</h1>");
            res.write("</div>");
            res.write("<ul class='w3-ul w3-hoverable'>");
            resp.data.forEach(genero => {
                res.write("<li><a href='/generos/" + genero.id + "'>" + genero.name + "</a></li>");
            });
            res.write("</ul>");
            res.write("<div class='w3-center'><a href='/'><button class='w3-button w3-teal'>Voltar</button></a></div>")
            res.write("</div></body>")
            res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>") 
            res.write("<h6>TPC3 - EngWeb2024</h6>");
            res.write("</footer>");
            res.end();
        })
        .catch(err => {
            res.write("<p><b>ERRO: </b>" + err + "</p>");
            res.end();
        });
    }
    else if (q.pathname.match(/generos\/g[0-9]+/)) {
        var id = pathParts[2];
        axios.get('http://localhost:3000/generos/' + id)
            .then(resp => {
                generoName = resp.data.name; // assumindo que resp.data é o gênero e tem uma propriedade 'genres' que é o nome do gênero
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'</head>")
                res.write("<body>");
                res.write("<div class='w3-container w3-teal w3-center'>");
                res.write("<h1>Filmes deste Género</h1>");
                res.write("</div>");
                res.write("<div class='w3-container'>");
                // Solicitar todos os filmes
                return axios.get('http://localhost:3000/filmes');
            })
            .then(resp => {
                // Escrever os filmes na resposta
                resp.data.forEach(filme => {
                    // verificar se o filme é do gênero correto
                    if (filme.genres == generoName) { // Alterado para usar o operador de igualdade
                        res.write("<p><a href='/filmes/" + filme.id.$oid + "'>" + filme.title  + "</a></p>"); // Alterado para usar filme.id
                    }
                });
                res.write("<div class='w3-center'><a href='/generos'><button class='w3-button w3-teal'>Voltar</button></a></div>")
                res.write("</div></body>")
                res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
                res.write("<footer class='w3-container w3-teal'>");
                res.write("<h6>TPC3 - EngWeb2024</h6>");
                res.write("</footer>");
                res.end();
            })
            .catch(err => {
                res.write("<p><b>ERRO: </b>" + err + "</p>");
                res.end();
            });
    }
    else if (q.pathname == "/atores") {
        axios.get('http://localhost:3000/atores?_sort=name')
            .then(resp => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<head><link rel='stylesheet' type='text/css' href='./w3.css'</head>")
                res.write("<body>");
                res.write("<div class='w3-container w3-teal w3-center'>");
                res.write("<h1>Lista de Atores</h1>");
                res.write("</div>");
                res.write("<ul class='w3-ul w3-hoverable'>");
                for (i in resp.data) {
                    if (resp.data[i] && resp.data[i].nome) {
                        res.write("<li><a href='/atores/" + resp.data[i].id +  "'>" + resp.data[i].nome + "</a></li>"); // Adicionado o nome do ator dentro do link e uma barra antes do ID
                    }
                }
                res.write("</ul>");
                res.write("<div class='w3-center'><a href='/'><button class='w3-button w3-teal'>Voltar</button></a></div>")
                res.write("</div></body>")
                res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
                res.write("<footer class='w3-container w3-teal'>"); 
                res.write("<h6>TPC3 - EngWeb2024</h6>");
                res.write("</footer>");
                res.end();
            })
            .catch(err => {
                res.write("<p><b>ERRO: </b>" + err + "</p>");
                res.end();
            });

    }
    else if (q.pathname.match(/atores\/a[0-9]+/)) {
        var id = pathParts[2];
        var actorName;
        axios.get('http://localhost:3000/atores/' + id)
            .then(resp => {
                actorName = resp.data.nome;
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'</head>")
                res.write("<body>");
                res.write("<div class='w3-container w3-teal w3-center'>");
                res.write("<h1>Filmes em que o Ator participou</h1>");
                res.write("</div>");
                res.write("<div class='w3-container'>");
                res.write("<p><b>Nome: </b>" + actorName + "</p>");
                // Solicitar todos os filmes
                return axios.get('http://localhost:3000/filmes');
            })
            .then(resp => {
                // Escrever os filmes na resposta
                resp.data.forEach(filme => {
                    // verificar se o filme tem o ator correto
                    if (filme.cast && filme.cast.includes(actorName)) {
                        res.write("<p><a href='/filmes/" + filme.id.$oid + "'>" + filme.title  + "</a></p>"); // Alterado para usar filme.id
                    }
                });
                res.write("<div class='w3-center'><a href='/atores'><button class='w3-button w3-teal'>Voltar</button></a></div>")
                res.write("</div></body>")
                res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
                res.write("<footer class='w3-container w3-teal'>");
                res.write("<h6>TPC3 - EngWeb2024</h6>");
                res.write("</footer>");
                res.end();
            })
            .catch(err => {
                res.write("<p><b>ERRO: </b>" + err + "</p>");
                res.end();
            });
        }
    }
}).listen(2020);

console.log('Servidor iniciado na porta 2020. Pressione Ctrl+C para encerrar.');