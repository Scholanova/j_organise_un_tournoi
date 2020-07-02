var express = require('express');
var router = express.Router();
const CompetitionServices = require('../services/CompetitionServices')

router.get('/', function(req, res, next) {
    console.log("entrée routeur")
    CompetitionServices.findAll()
    .then((competitions)=>{
        res.render('competition/list',{competitions});
    })
    .catch(next)
});

router.get('/:id', function(req, res, next) {
    const competitionId = req.params.id
    
    CompetitionServices.findById(competitionId)
    .then((competitions)=>{
        console.log(competitions)
        console.log("---------")
        console.log(competitions.models)
        console.log("---------")
        res.render('competition/list',{competitions});
    })
    .catch(next)
});


module.exports = router;