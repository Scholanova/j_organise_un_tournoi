const competitionRepository = require('../repositories/competitionRepository')

const competitionService = {
    create: (competitionData) => {
        return Promise.resolve(competitionData)
            .then((competitionData) => {
                return competitionRepository.create(competitionData)
            })
            
    },
    findByStatus:(CompetitionStatus) => {
        return Promise.resolve(CompetitionStatus)
        .then(competitionRepository.listByStatus)
    },
    findAll:() => {
        return Promise.resolve()
        .then(competitionRepository.listAll)
    },
    findMatchOfCompetitionByID:(competitionID) => {
        return Promise.resolve(competitionID)
            .then(competitionRepository.listMatchOfCompetitionByID)
    },
    findById:(id) =>{
        return competitionRepository.get(id)
    }
}

module.exports = competitionService