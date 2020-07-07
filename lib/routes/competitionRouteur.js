var express = require('express');
var router = express.Router();
const competitionServices = require('../services/competitionServices');
const matchServices = require('../services/matchServices');
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
    let participants = req.body['name_participant']
    let id_competition;

    return competitionServices.create(competitionData)
        .then((competition) => {
            id_competition = competition.id
            console.log("COMPETITION CREE")
        })
        .then(() => {
            console.log("AVANT SERVICE")
            matchServices.createAllMatch(id_competition,competitionData.nb_participant)
            console.log("APRES SERVICE")
            
        })
        .then(()=>{
            console.log("AVANT RENDER")
            res.redirect(`/competition/${id_competition}`)
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
    competitionServices.findById(competitionId)
    .then((competitions)=>{
        res.render('competition/competition',{competitions});
    })
    .catch(next)
});


module.exports = router;