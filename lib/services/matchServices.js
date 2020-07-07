const matchRepository = require('../repositories/matchRepository')

const matchService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(matchRepository.get)
    },
    updateBracket:(id,vainqueur,competition_id)=>{
        console.log('score services')
        let score_update = {
            id_match:id,
            vainqueur:vainqueur,
            competition_id:competition_id
        }
        return Promise.resolve(score_update)
        .then(matchRepository.setWinner)
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