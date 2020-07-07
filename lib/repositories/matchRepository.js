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
    setWinner:(score_update)=>{
        console.log("en cours de dev")
    }

}

module.exports = matchRepository