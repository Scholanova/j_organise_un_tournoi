const matchRepository = require('../repositories/matchRepository')

const matchService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(matchRepository.get)
    },
    updateBracket:(id,score_1,score_2,vainqueur,competion_id)=>{
        console.log('score services')
        console.log('score 1')
        console.log(score_1)
        console.log(score_2)
        let score_update = {
            id_match:id,
            score1:score_1,
            score2:score_2,
            vainqueur:vainqueur,
            competion_id:competion_id
        }
        return Promise.resolve(score_update)
        .then(matchRepository.setScore)
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