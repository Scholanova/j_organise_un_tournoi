const participantRepository = require('../repositories/participantRepository')

const participantService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(participantRepository.get)
    },
    createAllParticipant:(participants) => {
        let idParticipantsCrees = [];
        
        participants.forEach((participantName) => {
            participantService.createParticipant(participantName)
            .then((participant)=> {
                console.log(participant.id)
                idParticipantsCrees.push(participant.id)
                console.log(idParticipantsCrees)
            })
        })
        console.log(idParticipantsCrees);
        return idParticipantsCrees;
    },
    createParticipant:(participantName) => {
        return Promise.resolve(participantName).then(participantRepository.create);
    }
}

module.exports = participantService