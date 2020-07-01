const competitonRepository = require('../repositories/competitionRepository')

const CompetitionService = {
    findByStatus:(CompetitionStatus) => {
        console.log("entrée service")
        return Promise.resolve(CompetitionStatus)
        .then(competitonRepository.listByStatus)
    },
    findAll:() => {
        return Promise.resolve()
        .then(competitonRepository.listAll)
    }
}

module.exports = CompetitionService