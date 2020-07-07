const matchRepository = require('../repositories/matchRepository')

const matchService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(matchRepository.get)
    },
    createAllMatch:(idCompetition,nbParticipant) => {
        for(let i=1;i<nbParticipant;i++){
            console.log("AVANT CREATION DU MATCH N°" + i + " DE LA COMPET : " + idCompetition)
            matchService.createMatch(idCompetition)
        }
    },
    createMatch:(idCompetition) => {
        matchRepository.create(idCompetition);
    }
}

module.exports = matchService