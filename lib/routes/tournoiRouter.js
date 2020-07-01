var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log('bon routeur')
    res.render('tournoi/list');
});

module.exports = router;