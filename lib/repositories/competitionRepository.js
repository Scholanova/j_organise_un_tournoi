const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Competition = models.Competition

const tournoiRepository = {

    get: (id) => {
        return Competition.findOne({where: {id} })
        .then((tournoiResult) => {
            if (tournoiResult === null){
                throw new ResourceNotFoundError()
            }
            return tournoiResult
        })
    },

    create: (tournoiData) => {
        const new_tournoi = new tournoi(tournoiData)
        return new_tournoi.save()
    },
    delete: (id) => {
        return Competition.destroy({ where: { id } })
    },
    listAll: () => {
        return Competition.findAll()
    },
    listByStatus: (CompetitionStatus) => {
        console.log("entrée repo")
        console.log(models.tournoi)
        //console.log(Tournoi)
        return Competition.findAll({where:{status:CompetitionStatus}})
    }
}

module.exports = tournoiRepository