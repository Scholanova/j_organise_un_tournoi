const Joi = require('@hapi/joi')



const validatorService = {
    createCompetition: (joiCompetitionData) => {

        const competitionSchema = Joi.object({
            name_organisateur: Joi.string().min(4, 'utf8').required(),
            name: Joi.string(),
            nb_participant: Joi.number().integer().positive().min(1).required(),
            participants: Joi.array().items(Joi.string().required()).min(parseInt(joiCompetitionData.nb_participant)).max(parseInt(joiCompetitionData.nb_participant)).required()
        })

        return Promise.resolve(joiCompetitionData)
            .then((joiCompetitionData) => {
                const { value, error } = competitionSchema.validate(joiCompetitionData, { abortEarly: false })
                if (error) { throw error }
                return value
            })
    },
}

module.exports = validatorService