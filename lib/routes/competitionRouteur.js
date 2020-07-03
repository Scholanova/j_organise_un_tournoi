var express = require('express');
var router = express.Router();
const competitionServices = require('../services/competitionServices');
const Joi = require('@hapi/joi');

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


module.exports = router;