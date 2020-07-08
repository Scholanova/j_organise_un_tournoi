const Joi = require('@hapi/joi')
const { RessourceNotFoundError,TotalParticipantDifferentFromNbParticipant } = require('../errors');

const competitionSchema = Joi.object({
    name_organisateur: Joi.string().min(4, 'utf8').required(),
    name: Joi.string(),
    nb_participant: Joi.number().integer().positive().min(1).required()
})

const validatorService = {
    createCompetition: (competitionData,participants) => {
        return Promise.resolve(competitionData)
            .then((competitionData) => {
                const { value, error } = competitionSchema.validate(competitionData, { abortEarly: false })
                if (error) { throw error }
                return value
            })
            .then(()=>{
                
                if( participants.length != competitionData.nb_participant){
                    throw new TotalParticipantDifferentFromNbParticipant("Le nombre de participant inscrit ne correspond pas au nombre total de participant !")
                }

            })
    },
}

module.exports = validatorService