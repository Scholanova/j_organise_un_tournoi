const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Match = models.Match
const competitionRepository = require('./competitionRepository')
const { sequelize } = require('../models')
const { Op, where } = require("sequelize");

const matchRepository = {
    get: (id) => {
        return Match.findOne({where: {id} })
        .then((matchResult) => {
            if (matchResult === null){
                throw new ResourceNotFoundError()
            }
            return matchResult
        })
    },
    setScore:(score_update) =>{
        console.log(score_update)
        var id = score_update.id_match
        console.log(id)
        return Match.update({score1:score_update.score1,score2:score_update.score2},{where:{id}})
        .then((matchResult) => {
            if (matchResult === null){
                throw new ResourceNotFoundError()
            }
            return matchResult
        })
    },
    setWinner: async (score_update)=>{
        
        var query_return = await competitionRepository.count_participant(score_update.competition_id)
        var nb_participant = query_return.dataValues.nb_participant
        
        
        var query_count = await Match.findAndCountAll(
            {where:{
                competition:{[Op.ne]:score_update.competition_id},
                id:{[Op.lt]:score_update.id_match}
                }
            }
        )

        
        var previous_id = query_count.count
        
        var nb_match = nb_participant/2

        var fake_id_count = await Match.findAndCountAll(
            {where:{
                id:{[Op.lte]:score_update.id_match},
                competition:score_update.competition_id
            }
        })
        var fake_id = fake_id_count.count
        

        var new_id=nb_match+Math.round(fake_id/2)+previous_id


        var new_match = await Match.findOne({where:new_id})

        //console.log(new_match)
        if(new_match.dataValues.p1 === null){
            console.log("j'écris dans p1")
            return Match.update({p1:score_update.vainqueur},{where:{id:new_id}})
        }
        else if(new_match.dataValues.p2 === null){
            console.log("j'écris dans p2")
            return Match.update({p2:score_update.vainqueur},{where:{id:new_id}})
        }
    },
    create: (idCompetition) => {
        let matchData = {
            competition : idCompetition
        }
        const new_match = new Match(matchData)
        return new_match.save()
    },
    setUpMatchRoundOne: (info_match) => {
        return Match.update({p1:info_match.p1,p2:info_match.p2},{where:{id:info_match.id_match}})
        .then((matchResult) => {
            if (matchResult === null){
                throw new ResourceNotFoundError()
            }
            return matchResult
        })
    }


}

module.exports = matchRepository