const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Participant = models.Participant


const participantRepository = {
    get: (id) => {
        return Participant.findOne({where: {id} })
        .then((participantResult) => {
            if (participantResult === null){
                throw new ResourceNotFoundError()
            }
            return participantResult
        })
    },
    create: (participantName) => {
        let participantData = {
            name : participantName
        }
        const new_participant = new Participant(participantData)
        return new_participant.save()
    }

}

module.exports = participantRepository