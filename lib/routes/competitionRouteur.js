var express = require('express');
var router = express.Router();
const competitionServices = require('../services/competitionServices');
const Joi = require('@hapi/joi');

router.get('/', function(req, res, next) {
    console.log("entrée routeur")
    CompetitionServices.findAll()
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
    CompetitionServices.findMatchOfCompetitionByID(competitionID)
        .then((competitions)=>{
            res.render('competition/bracket',{competitions});
        })
        .catch(next)
});


module.exports = router;