const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const participant = models.Participant


const participantRepository = {
    get: (id) => {
        return participant.findOne({where: {id} })
        .then((participantResult) => {
            if (participantResult === null){
                throw new ResourceNotFoundError()
            }
            return participantResult
        })
    }

}

module.exports = participantRepository