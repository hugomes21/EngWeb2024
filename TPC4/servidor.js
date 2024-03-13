var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url == '/compositores')
                {
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                    .then(resp=>{
                        var compositores = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.compositoresListPage(compositores, d))
                    })
                    .catch(erro =>{
                        res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de compositores: " + erro + "</p>")
                        res.end()
                    })
                }

                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/C[0-9]+$/i.test(req.url)){
                    id = req.url.split("/")[2]
                    axios.get("http://localhost:3000/compositores/" + id)
                    .then(resp=>{
                        var compositor = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.compositoresPage(compositor, d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor: " + id + "::" + erro + "</p>")
                        res.end()
                    })
                }
               
                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url == '/compositores/registo'){
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(templates.compositoresFormPage(d))
                    res.end()
                }
               
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    id = req.url.split("/")[3]
                    axios.get("http://localhost:3000/compositores/" + id)
                    .then(resp=>{
                        var compositor = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.compositoresFormEditPage(compositor, d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(505, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor: " + id + "::" + erro + "</p>")
                        res.end()
                    })
                }
               
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]+$/i.test(req.url)){
                    id = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/compositores/" + id)
                    .then(resp=>{
                        compositor = resp.data
                        res.writeHead(303, {'Location' : '/compositores'})
                        res.write(templates.compositoresFormEditPage(compositor, d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(507, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor: " + id + "::" + erro + "</p>")
                        res.end()
                    });
                }

                // GET /periodos --------------------------------------------------------------------
                else if(req.url == '/periodos'){
                    axios.get("http://localhost:3000/compositores/")
                    .then(resp=>{
                        var periodos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.periodsListPage(periodos, d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(508, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos: " + erro + "</p>")
                        res.end()
                    })
                }
                
                // GET /periodos/:id --------------------------------------------------------------------
                else if(/\/periodos\/[a-zA-Z]+$/i.test(req.url)){
                    let periodo = req.url.split("/")[2]
                    axios.get("http://localhost:3000/compositores?periodo=" + periodo)
                    .then(resp=>{
                        let compositoresDoPeriodo = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.periodsPage(periodo, compositoresDoPeriodo, d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(509, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o periodo: " + periodo + "::" + erro + "</p>")
                        res.end()
                    })
                }
                
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(502, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>GET Request não suportado: " + req.url + "</p>")
                    res.end()
                }
                break
            
            
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if (req.url == '/compositores/registo') {
                    collectRequestBodyData(req, result => {
                        axios.post("http://localhost:3000/compositores", result)
                        .then(resp=>{
                            res.writeHead(303, {'Location' : '/compositores/' + resp.data.id})
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(504, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o compositor: " + id + "::" + erro + "</p>")
                            res.end()
                        })
                    });
                }
                
                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        /* Usamos um 'put', pois este comando EDITA. Se fosse o 'post' ACRESENTA dados */
                        axios.put("http://localhost:3000/compositores/" + result.id, result)
                        .then(resp=>{
                            res.writeHead(303, {'Location' : '/compositores/' + result.id})
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(506, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o compositor: " + id + "::" + erro + "</p>")
                            res.end()
                        })
                    })
                }

                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/[a-zA-Z]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        /* Usamos um 'put', pois este comando EDITA. Se fosse o 'post' ACRESENTA dados */
                        axios.put("http://localhost:3000/compositores/" + result.periodo, result)
                        .then(resp=>{
                            res.writeHead(303, {'Location' : '/periodos/' + result.periodo})
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(511, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o periodo: " + id + "::" + erro + "</p>")
                            res.end()
                        })
                    })
                }

                // POST ? -> Lancar um erro
                else{
                    res.writeHead(501, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>POST Request não suportado: " + req.url + "</p>")
                    res.end()
                }
                break
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write("<p>Método não suportado: " + req.method + "</p>")
                break
        }
    }
})

compositoresServer.listen(8080, ()=>{
    console.log("Servidor à escuta na porta 8080...")
})