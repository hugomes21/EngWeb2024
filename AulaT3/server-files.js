var fs = require
var url = require('url')
var axios = require('axios')
var http = require('http')

http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    var filename = '.' + q.pathname
    var regex = /^\/a[0-9]{1,3}+$/
    if (regex.test(filename)) {
        axios.get('https://localhost:3001' + q.pathname.substring(2))
            .then(response => {
                data = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(JSON.stringify(data))
                res.end()
            }).catch(error => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>' + error + '</pre>')
                res.end()
            })
    }