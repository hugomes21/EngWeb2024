var express = require('express')
var router = express.Router()
var axios = require('axios')
const e = require('express')

// GET /compositores --------------------------------------------------------------------
router.get('/', function(req, res, next)  {
  var date = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores?_sort=nome")
  .then(resp=>{
        var compositores = resp.data
        compositores.forEach(compositor => {
            compositor.link = "/compositores/" + compositor.id
        });
        res.status(200).render('compositoresListaPage', {'compositores': compositores, 'date': date})
    })
    .catch(erro =>{
        res.status(503).render('error', {error: erro})
    })
});

// GET /registo --------------------------------------------------------------------
router.get('/registo', function(req, res, next)  {
    console.log("GET /registo")
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render('compositoresFormPage', {'date': d})
});

// POST /registo --------------------------------------------------------------------
router.post('/registo', function(req, res, next)  {
    console.log("POST /registo")
    var d = new Date().toISOString().substring(0, 16)
    result = req.body
    axios.post("http://localhost:3000/compositores", result)
    .then(resp=>{
        res.redirect('/')
    })
    .catch(erro =>{
        console.log(erro.response.status); // Print the status code
        console.log(erro.response.data); // Print the response data
        res.status(505).render('error', {error: erro})
    })
}); 

// GET /compositores/:id --------------------------------------------------------------------
router.get('/:idCompositor', function(req, res, next)  {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idCompositor
    axios.get("http://localhost:3000/compositores/" + id)
    .then(resp=>{
        var compositor = resp.data
        res.status(200).render('compositoresPage', {'compositor': compositor, 'date': d})
    })
    .catch(erro =>{
        res.status(504).render('error', {error: erro})
    })
});

// GET /edit/:id --------------------------------------------------------------------
router.get('/edit/:idCompositor', function(req, res, next)  {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idCompositor
    axios.get("http://localhost:3000/compositores/" + id)
    .then(resp=>{
        var compositor = resp.data
        res.status(200).render('compositoresFormEditPage', {'compositor': compositor, 'date': d})
    })
    .catch(erro =>{
        res.status(506).render('error', {error: erro})
    })
});

// POST /edit/:id --------------------------------------------------------------------
router.post('/edit/:idCompositor', function(req, res, next)  {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idCompositor
    result = req.body
    axios.put("http://localhost:3000/compositores/" + id, result)
    .then(resp=>{
        res.redirect('/')
    })
    .catch(erro =>{
        res.status(507).render('error', {error: erro})
    })
});

// DELETE /delete/:id --------------------------------------------------------------------
router.get('/delete/:idCompositor', function(req, res, next)  {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idCompositor
    axios.delete("http://localhost:3000/compositores/" + id)
    .then(resp=>{
        res.redirect('/')
    })
    .catch(erro =>{
        res.status(508).render('error', {error: erro})
    })
});


module.exports = router