var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer((req, res) => {
  console.log(req.method + " " + req.url );
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}) //200 é codigo de "está tudo bem"
  res.write("<h1> Cidades de Portugal</h1>")

  var q = url.parse(req.url, true)
  var regex = /^\/c\d+$/

  if (q.pathname == "/") {
    fs.readFile('cities/mainPage.html', (erro, dados) => {
      if (!erro) {
        res.write(dados)
      }
      else {
        res.write("<p><b>ERRO: </b>" + erro + "</p>")
      }
      res.end()
    })
  }
  else if (regex.test(q.pathname)) {
    var id = q.pathname.split("c")[1]
    fs.readFile('cities/c' + id + '.html', (erro, dados) => {
      if (!erro) {
        res.write(dados)
      }
      else {
        res.write("<p><b>ERRO: </b>" + erro + "</p>")
      }
      res.end()
    }
)}
  else {
    res.write("<p><b>ERRO: </b>" + q.pathname + " não está implementado neste servidor.</p>")
    res.end()
  }
}).listen(2002)

console.log("Servidor à escuta na porta 2002")