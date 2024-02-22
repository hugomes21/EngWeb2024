// Aula teórica - 2ª semana

/*
var http = require('http');


http.createServer(function (req, res) { // cria um servidor
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); // envia a reposta
  res.write('<b>Hello World!</b>'); // escreve na resposta
  res.end(); // finaliza a resposta
}).listen(7777);


http.createServer(function (req, res) { // cria um servidor
    var d = new Date().toIOSString().substring(0, 10);
    res.writeHead(200, {'Content-Type': 'text/html'}); // envia a reposta
    console.log(req.method + " " + req.url + " " + d);
    res.write("<pre>" + req.method + " " + req.url + " " + d + "</pre>"); // escreve na resposta
    res.write("Olá, mundo!"); // escreve na resposta
    res.end(); // finaliza a resposta
}).listen(7777); // porta do servidor
  
*/

// Aula prática - 2ª semana

var http = require('http')
var url = require('url')
var meta = require('./aux');
var axios = require('axios')

http.createServer((req, res) => 
{
    console.log(req.method + " " + req.url );
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})//200 é codigo de "está tudo bem"
    res.write("<h1> Uma página web</h1>")
    res.write("<h2> Uma cena ----------------------------------- </h2>")
    res.write("<p>Página criada com node.js por " 
    + meta.myName()
    + " em "
    + meta.myDateTime()
    + " na turma "
    + meta.turma)
    

    res.write("<h2> Outra cena ----------------------------------- </h2>")


    var q = url.parse(req.url, true)
    res.write("True: <pre> " + JSON.stringify(q)  + "</pre>")

    var q2 = url.parse(req.url, false)
    res.write("False: <pre> " + JSON.stringify(q2)  + "</pre>")

    res.write("<h2> Outra cena ----------------------------------- </h2>")
    if (q.pathname == "/add") { //pathname é o que devemos incluir no url
      var n1 = parseInt(q.query.n1, 10)
      var n2 = parseInt(q.query.n2, 10)
      var soma = n1 + n2
      res.write("<pre>" + n1 + " + " + n2 + " = " + soma + "</pre>")
    } else if(q.pathname == "/sub") { //pathname é o que devemos incluir no url
      var n1 = parseInt(q.query.n1, 10)
      var n2 = parseInt(q.query.n2, 10)
      var sub = n1 - n2
      res.write("<pre>" + n1 + " - " + n2 + " = " + sub + "</pre>")
    } else {
      res.write("<pre>Operação desconhecida</pre>")
    }

      res.write("<h2> Outra cena ----------------------------------- </h2>")

      var q3 = url.parse(req.url, true)
      if (q3.pathname == "/cidades") {
        axios.get('http://localhost:3000/cidades') //faz um pedido a um servidor
        .then(function(resposta) {   //se o pedido for bem sucedido
          var data = resposta.data
          res.write("<ul>")
          for (var i in data) {
            res.write("<li> <a href='/cidades/" + data[i].id + "'>" + data[i].nome + "</a></li>")
          }
          res.write("</ul>")
          res.end()
        }) 
        .catch(function(erro) { //se o pedido falhar
          console.log("Erro: " + erro)
          res.write("<p>" + erro + "</p>")
          res.end()
        })

      } else if (req.url.match(/\/cidades\/c|d+/)) {
        let id = req.url.substring(9)
        axios.get("http://localhost:3000/cidades/" + id) //faz um pedido a um servidor
        .then(resposta => {   //se o pedido for bem sucedido
          var data = resposta.data
          console.log(data)
          res.write("<h1>" + data["nome"] + "</h1>")
          res.write("<b>População: </b>" + data["população"] )
          res.write("<p>Distrito: " + data.distrito + "</p>")
          res.write(data["descrição"])
          res.write("<p><a href='/cidades'>Voltar</a></p>")
          res.end()
        }) 
        .catch(function(erro) { //se o pedido falhar
          console.log("Erro: " + erro)
          res.write("<p>" + erro + "</p>")
          res.end()
        })
      }

    }).listen(2002)

    console.log("Servidor à escuta na porta 2002")
