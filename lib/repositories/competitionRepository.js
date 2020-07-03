const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const competition = models.Competition

const competitionRepository = {

    get: (id) => {
        return competition.findOne({where: {id} })
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
        return competition.destroy({ where: { id } })
    },
    listAll: () => {
        return competition.findAll()
    },
    listByStatus: (CompetitionStatus) => {
        console.log("entrée repo")
        console.log(models.competition)
        //console.log(competition)
        return competition.findAll({where:{status:CompetitionStatus}})
    }
}

module.exports = competitionRepository