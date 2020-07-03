const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const match = models.Match


const matchRepository = {
    get: (id) => {
        return match.findOne({where: {id} })
        .then((matchResult) => {
            if (matchResult === null){
                throw new ResourceNotFoundError()
            }
            return matchResult
        })
    }

}

module.exports = matchRepository