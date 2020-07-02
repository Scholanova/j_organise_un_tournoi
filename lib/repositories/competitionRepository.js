const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Competition = models.Competition
const Match = models.Match
const Participant = models.Participant
const competitionRepository = {

    get: (id) => {
        return Competition.findOne({
            where: { id } ,  
            include: [{ 
                model: Match,
                include:[
                {   
                    as: 'player1',
                    model: Participant
                },
                {
                    as: 'player2',
                    model: Participant
                }]
            }]
        })
        .then((CompetitionResult) => {
            if (CompetitionResult === null){
                throw new RessourceNotFoundError()
            }
            return CompetitionResult
        })
    },
    create: (competitionData) => {
        const new_competition = new Competition(competitionData)
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
    },
    listMatchOfCompetitionByID: (CompetitionID) => {
        console.log("entrée repo")
        console.log(models.competition)
        //console.log(competition)
        return Competition.findAll({where:{CompetitionID}})
    }

}

module.exports = competitionRepository