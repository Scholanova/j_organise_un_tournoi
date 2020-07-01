const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const tournois = models.tournois

const tournoiRepository = {

    get: (id) => {
        return tournois.findOne({where: {id} })
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
        return tournois.destroy({ where: { id } })
    },
    listAll: () => {
        return tournois.findAll()
    },
    listByActiveStatus: () => {
        console.log("entrée repo")
        console.log(models.tournoi)
        //console.log(Tournoi)
        return tournois.findAll({where:{status:true}})
    }
}

module.exports = tournoiRepository