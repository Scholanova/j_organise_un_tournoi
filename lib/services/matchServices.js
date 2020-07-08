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
        compteur_participant = 0;
        tab_id_match_firstRound.forEach((match)=>{
            let info_match ={
                id_match : match,
                p1 : tab_id_participants_Crees[compteur_participant],
                p2 : tab_id_participants_Crees[compteur_participant+1]
            }
            matchRepository.setUpMatchRoundOne(info_match)
            compteur_participant+=2
        })
    }
    
}
module.exports = matchService