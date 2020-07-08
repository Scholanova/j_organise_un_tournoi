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
        console.log("en cours de dev")
        var query_return = await competitionRepository.count_participant(score_update.competion_id)
        var nb_participant = query_return.dataValues.nb_participant
        console.log("avant requete")
        
        var query_count = await Match.findAndCountAll(
            {where:{
                competition:{[Op.ne]:score_update.competition_id},
                id:{[Op.lt]:score_update.id_match}
                }
            }
        )
        
        console.log("après requete et avant query count")
        console.log(query_count.count)
        console.log("après query count")
        var previous_id = 0
        console.log("nbparticipants : ")
        console.log(nb_participant)
        var nb_match = nb_participant/2

        var new_id=nb_match+Math.round(score_update.id_match/2)+previous_id


        

        console.log("nbpariticpants : nouvel_id")
        console.log(new_id)

        var new_match = await Match.findOne({where:new_id})

        console.log(new_match)

    },
    create: (idCompetition) => {
        let matchData = {
            competition : idCompetition
        }
        const new_match = new Match(matchData)
        return new_match.save()
    }


}

module.exports = matchRepository