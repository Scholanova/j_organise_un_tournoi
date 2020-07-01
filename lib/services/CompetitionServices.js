const competitonRepository = require('../repositories/competitionRepository')

const CompetitionService = {
    findByStatus:() => {
        console.log("entrée service")
        return Promise.resolve()
        .then(competitonRepository.listByActiveStatus)
    }
}

module.exports = CompetitionService