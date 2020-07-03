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
    }

}

module.exports = matchRepository