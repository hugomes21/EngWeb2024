var express = require('express')
var router = express.Router()
var axios = require('axios')
const e = require('express')


// GET /periodos --------------------------------------------------------------------
router.get('/', function(req, res, next)  {
    var date = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/compositores?_sort=nome")
    .then(resp=>{
          var compositores = resp.data
          var periodos = new Set(compositores.map(compositor => compositor.periodo));
          res.status(200).render('periodosListaPage', {'periodos': Array.from(periodos), 'date': date})
      })
      .catch(erro =>{
          res.status(509).render('error', {error: erro})
      })
  });

// GET /periodos/:id --------------------------------------------------------------------
router.get('/:periodCompositor', function(req, res, next)  {
    var date = new Date().toISOString().substring(0, 16)
    var period = req.params.periodCompositor
    axios.get("http://localhost:3000/compositores?periodo=" + period)
    .then(resp=>{
        var compositores = resp.data
        res.status(200).render('periodosPage', {'compositores': compositores, 'date': date, 'periodo': period})
      })
      .catch(erro =>{
          res.status(510).render('error', {error: erro})
      })
  });
  

  module.exports = router

