const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Competition = models.Competition

const competitionRepository = {

    get: (id) => {
        return Competition.findOne({where: {id} })
        .then((competitionResult) => {
            if (competitionResult === null){
                throw new ResourceNotFoundError()
            }
            return competitionResult
        })
    },

    create: (competitionData) => {
        const new_competition = new competition(competitionData)
        return new_competition.save()
    },
    delete: (id) => {
        return Competition.destroy({ where: { id } })
    },
    listAll: () => {
        return Competition.findAll()
    },
    listByStatus: (CompetitionStatus) => {
        console.log("entrée repo")
        console.log(models.competition)
        //console.log(competition)
        return Competition.findAll({where:{status:CompetitionStatus}})
    }
}

module.exports = competitionRepository