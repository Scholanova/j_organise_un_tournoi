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


module.exports = router;