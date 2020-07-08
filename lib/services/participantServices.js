const participantRepository = require('../repositories/participantRepository')

const participantService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(participantRepository.get)
    },
    createAllParticipant: (participants) => {
        return Promise.all(participants.map(item => participantService.createAndReturnId(item)))
        .then((data)=>{
            return data
        })
    },
    createParticipant: (participantName) => {
        return Promise.resolve(participantName).then(participantRepository.create);
    },

    createAndReturnId: (participantName) => {
        return participantService.createParticipant(participantName)
        .then((participant) => {
            return participant.id
        })
    }
}


module.exports = participantService