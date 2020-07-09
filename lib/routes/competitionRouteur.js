var express = require('express');
var router = express.Router();
const competitionServices = require('../services/competitionServices');
const matchServices = require('../services/matchServices');
const participantServices = require('../services/participantServices');
const validatorServices = require('../services/validatorServices');
const Joi = require('@hapi/joi');
const { RessourceNotFoundError } = require('../errors');
const matchService = require('../services/matchServices');

router.get('/', function(req, res, next) {
    
    competitionServices.findAll()
    .then((competitions)=>{
        console.log(competitions)
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

    const joiCompetitionData = {
        name_organisateur: req.body['organisateur'],
        name: req.body['name'],
        nb_participant: req.body['nbparticipant'] ,
        participants : req.body['name_participant']  
    }
    const participants = req.body['name_participant']
    let id_competition,tab_id_match_firstRound=[],tab_id_participants;

    return validatorServices.createCompetition(joiCompetitionData)
        .then (() => {
           return competitionServices.create(competitionData)
        })
        .then((competition) => {
            id_competition = competition.id
            return Promise.resolve(matchServices.createAllMatch(id_competition,competitionData.nb_participant))
        })
        .then((tab_id_match_Crees) => {
            tab_id_match_Crees.map((matchId,key)=>{
                if (key<competitionData.nb_participant/2){
                    tab_id_match_firstRound.push(matchId)
                }
            })
            return Promise.resolve(participantServices.createAllParticipant(participants))
        })
        .then((tab_id_participants_Crees)=>{
            tab_id_participants = tab_id_participants_Crees;
            Promise.resolve(matchServices.fillingRoundOne(id_competition,competitionData.nb_participant,tab_id_match_firstRound,tab_id_participants_Crees))
        })
        .then(()=>{
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
            }
            else {
                next(error)
            }
        })
})

router.get('/:id', function(req, res, next) {
    const competitionId = req.params.id
    competitionServices.findById(competitionId)
    .then((competitions)=>{
        res.render('competition/competition',{competitions});
    })
    .catch(next)
});

router.post('/:id',function(req,res,next) {
    var competition_id = req.params.id;
    var url = '/competition/'+competition_id
    var vainqueur = req.body.vainqueur
    var match_id = req.body.match_id
    

    matchService.updateBracket(match_id,vainqueur,competition_id).then(()=>{
        res.redirect(url)
    }).catch(next)
})


module.exports = router;