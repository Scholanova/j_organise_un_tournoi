const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Match = models.Match
const competitionRepository = require('./competitionRepository')


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
        var nb_participant = await competitionRepository.count_participant(score_update.competion_id)
        console.log(nb_participant)
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