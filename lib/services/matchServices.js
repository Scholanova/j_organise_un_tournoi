const matchRepository = require('../repositories/matchRepository')

const matchService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(matchRepository.get)
    }
}

module.exports = matchService