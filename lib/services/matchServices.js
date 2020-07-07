const matchRepository = require('../repositories/matchRepository')

const matchService = {
    getOne:(id)=>{
        return Promise.resolve(id)
        .then(matchRepository.get)
    },
    updateBracket:(id,score_1,score_2,vainqueur)=>{
        console.log('score services')
        console.log('score 1')
        console.log(score_1)
        console.log(score_2)
        let score_update = {
            id_match:id,
            score1:score_1,
            score2:score_2,
            vainqueur:vainqueur,
        }
        return Promise.resolve(score_update)
        .then(matchRepository.setScore)
        .then(matchRepository.setWinner)
    }
}

module.exports = matchService