var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('pag1.html', function(erro, data) {
        if(erro) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(dados);
            res.end();
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write('<pre>' + erro + '</pre>');
            res.end();
        }
    })
}).listen(3000)