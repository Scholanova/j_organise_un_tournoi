const Joi = require('@hapi/joi')
const competitionRepository = require('../repositories/competitionRepository')


const competitionSchema = Joi.object({
    name_organisateur: Joi.string().min(4, 'utf8').required(),
    name: Joi.string(),
    nb_participant: Joi.number().integer().positive().min(1).required()
})

const competitionService = {
    create: (competitionData) => {
        return Promise.resolve(competitionData)
            .then((competitionData) => {
                return competitionRepository.create(competitionData)
            })
            
    },
    findByStatus:(CompetitionStatus) => {
        console.log("entrée service")
        return Promise.resolve(CompetitionStatus)
        .then(competitionRepository.listByStatus)
    },
    findAll:() => {
        return Promise.resolve()
        .then(competitionRepository.listAll)
    },
    findMatchOfCompetitionByID:(competitionID) => {
        console.log("entrée service")
        return Promise.resolve(competitionID)
            .then(competitionRepository.listMatchOfCompetitionByID)
    },
    findById:(id) =>{
        return competitionRepository.get(id)
    }
}

module.exports = competitionService