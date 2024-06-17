var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor');

router.get('/', function(req, res) {
    Compositor.list()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

router.get('/:id', function(req, res) {
    Compositor.findById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

router.get('/delete/:id', function(req, res) {
    Compositor.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

router.post('/edit/:id', function(req, res) {
    Compositor.update(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

router.post('/insert', function(req, res) {
    Compositor.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;