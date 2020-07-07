var express = require('express');
var router = express.Router();
const competitionServices = require('../services/competitionServices');
const Joi = require('@hapi/joi');
const { RessourceNotFoundError } = require('../errors');
const matchService = require('../services/matchServices');

router.get('/', function(req, res, next) {
    console.log("entrée routeur")
    competitionServices.findAll()
    .then((competitions)=>{
        res.render('competition/list',{competitions});
    })
    .catch(next)
});

router.get('/new', function (req, res, next) {
    res.render('competition/new')
})

router.post('/new', function (req, res, next) {
    const competitionData = {
        name_organisateur: req.body['organisateur'],
        name: req.body['name'],
        nb_participant: req.body['nbparticipant']
    }
    return competitionServices.create(competitionData)
        .then((competition) => {
            //res.redirect(`/competition/${competition.id}`)
            res.redirect(`/`)
        })
        .catch((error) => {
            if (error instanceof Joi.ValidationError) {
                res.render('competition/new', {
                    values: {
                        name_organisateur: req.body['organisateur'],
                        name: req.body['name'],
                        nb_participant: req.body['nbparticipant']
                    },
                    failedFields: error.details
                })
            } else {
                next(error)
            }
        })
})

router.get('/bracket/:competitionID', function(req, res, next) {
    console.log("entrée routeur")
    competitionServices.findMatchOfCompetitionByID(competitionID)
        .then((competitions)=>{
            res.render('competition/bracket',{competitions});
        })
        .catch(next)
});
router.get('/:id', function(req, res, next) {
    const competitionId = req.params.id
    
    var tabIntToText = ['one','two','three']
    console.log(tabIntToText[1])
    competitionServices.findById(competitionId)
    .then((competitions)=>{
        competitions.Matches.forEach((match,key) => {
            console.log(match.player2.name)
        }) 
        res.render('competition/competition',{competitions});
    })
    .catch(next)
});

router.post('/:id',function(req,res,next) {
    var id = req.params.id;
    var url = '/competition/'+id
    var score1 = req.body.score1
    var score2 = req.body.score2
    var vainqueur = req.body.vainqueur
    var match_id = req.body.match_id
    var competion_id = req.params.id
    

    matchService.updateBracket(match_id,score1,score2,vainqueur,competion_id).then(()=>{
        res.redirect(url)
    }).catch(next)
})


module.exports = router;