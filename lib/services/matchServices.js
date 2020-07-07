const matchRepository = require('../repositories/matchRepository')

const matchService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(matchRepository.get)
    },
    createAllMatch:(idCompetition,nbParticipant) => {
        let tab_matchs = [];
        for(let i=1;i<nbParticipant;i++){
            tab_matchs.push(i)
        }

        return Promise.all(tab_matchs.map(item => matchService.createAndReturnId(idCompetition)))
        .then((data) => {
            return data
        })
    },
    createMatch:(idCompetition) => {
        return Promise.resolve(idCompetition).then(matchRepository.create);
    },
    createAndReturnId: (idCompetition) => {
        return matchService.createMatch(idCompetition)
        .then((match) => {
            return match.id
        })
    },
    fillingRoundOne:(id_competition,nb_participant,tab_id_match_firstRound,tab_id_participants_Crees) => {

        
        return Promise.resolve(idCompetition).then(matchRepository.create);
    }
    
}

module.exports = matchService