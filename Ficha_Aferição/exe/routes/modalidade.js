var express = require('express');
var router = express.Router();
var Mo = require('../controller/modalidade');

// GET /modalidades route
router.get('/', function(req, res, next) {
    Mo.list()
        .then(dados => res.jsonp(dados))
        .catch(erro => {
            res.jsonp(erro);
        })
});

module.exports = router;