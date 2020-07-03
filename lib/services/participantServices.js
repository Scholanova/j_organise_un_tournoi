const participantRepository = require('../repositories/participantRepository')

const participantService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(participantRepository.get)
    }
}

module.exports = participantService