var express = require('express');
var router = express.Router();
const tournoiService = require('../services/tournoiServices')

router.get('/', function(req, res, next) {
    console.log("entrée routeur")
    tournoiService.findByStatus()
    .then((tournoi)=>{
        res.render('bracket/list',{tournoi});
    })
    .catch(next)
});

module.exports = router;