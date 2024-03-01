var http = require('http');
var fs = require('fs');
var url = require('url');
var axios = require('axios');

function getOcorrencias(ocorrencias){
    return ()
    <div class='w3-container'>
        <table class='w3-table w3-striped'>
            <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Animal</th>
            </tr>
        
    
    ocorrencias.forEach(ocorrencia => {
        pagHTML+=
        <tr>
            <td>{{ocorrencia.id}</td>
            <td>${ocorrencia.nome}</td>
            <td>${ocorrencia.especie}</td>
            <td>${ocorrencia.raca}</td>
            <td>${ocorrencia.idade}</td>
            <td>${ocorrencia.dono}</td>
            <td>${ocorrencia.local}</td>
            <td>${ocorrencia.telefone}</td>
        </tr>
    });
    pagHTML += 
        </table>
            </div>
            <footer class='w3-container w3-teal'>
                <p>Gerado por servidor Node.js</p>
            </footer>
}


http.createServer(function (req, res) {
    console.log(req.method + " " + req.url);

    if (req.url === "/"){
        fs.readFile('pag.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        })
    } else if (req.url === "/animaisJSON"){
        axios.get('http//:localhost:3000/ocorrencias')
            .then(resp => {
                console.log(resp);
                res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
                res.write(JSON.stringify.resp.data);
                res.end();
            })
            .catch(error => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("<p>Erro: " + error + "</p>");
                res.end();
            });
    } else if (req.url === "/animais"){
        axios.get('http//:localhost:3000/ocorrencias')
            .then(resp => {
                console.log(resp);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                html = getOcorrencias(resp.data);
                res.write(html);
                res.end();
            })
            .catch(error => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("<p>Erro: " + error + "</p>");
                res.end();
            });
    }else if (req.url === "/w3.css"){
        fs.readFile('w3.css', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write("<p>Erro: nPedido não suportado</p>");
        res.write("<pre>" + req.method + " " + req.url + "</pre>");
        res.end();
    }
}).listen(2702);

console.log('Servidor à escuta na porta 2702...');