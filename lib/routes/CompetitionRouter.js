var express = require('express');
var router = express.Router();
const CompetitionServices = require('../services/CompetitionServices')

router.get('/', function(req, res, next) {
    console.log("entrée routeur")
    //CompetitionServices.findByStatus(false)
    CompetitionServices.findAll()
    .then((tournoi)=>{
        res.render('bracket/list',{tournoi});
    })
    .catch(next)
});

module.exports = router;