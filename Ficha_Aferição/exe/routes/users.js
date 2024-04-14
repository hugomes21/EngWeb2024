var express = require('express');
var router = express.Router();
var User = require('../controller/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => {
      console.error(erro);
      res.status(500).jsonp(erro);
    })
});

// POST user
router.post('/', function(req, res, next) {
  User.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {
      console.error(erro);
      res.status(500).jsonp(erro);
    })
});

// PUT user 
router.put('/:id', function(req, res, next) {
  User.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {
      console.error(erro);
      res.status(500).jsonp(erro);
    })
});

// DELETE user
router.delete('/:id', function(req, res, next) {
  User.delete(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => {
      console.error(erro);
      res.status(500).jsonp(erro);
    })
});

module.exports = router;
