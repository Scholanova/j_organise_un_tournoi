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
            .then((authorData) => {
                const { value, error } = competitionSchema.validate(competitionData, { abortEarly: false })
                if (error) { throw error }
                return value
            })
            .then(competitionRepository.create)
    },
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

module.exports = competitionService