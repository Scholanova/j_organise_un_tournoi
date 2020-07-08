const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Match = models.Match


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