var express = require('express');
var router = express.Router();
const CompetionServices = require('../services/CompetionServices')

router.get('/', function(req, res, next) {
    console.log("entrée routeur")
    CompetionServices.findByStatus()
    .then((tournoi)=>{
        res.render('bracket/list',{tournoi});
    })
    .catch(next)
});

module.exports = router;