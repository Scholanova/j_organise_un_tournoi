const { RessourceNotFoundError } = require('../errors')
const models = require('../models')
const Competition = models.Competition
const Match = models.Match
const Participant = models.Participant
const competitionRepository = {

    get: (id) => {
        return Competition.findOne({
            where: { id } , 
            order: [[Match,'id','asc']] ,
            include: [
                {
                    as: 'vainqueur_competition',
                    model: Participant
                },
                {
                    model: Match,
                    include:[
                        {   
                            as: 'player1',
                            model: Participant
                        },
                        {
                            as: 'player2',
                            model: Participant
                        },
                        {
                            as: 'vainqueur_match',
                            model: Participant
                        }
                    ]
                }
            ]
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
        
        
        return Competition.findAll({where:{status:CompetitionStatus}})
    },
    listMatchOfCompetitionByID: (CompetitionID) => {
        
        return Competition.findAll({where:{CompetitionID}})
    },
    count_participant:(id)=>{
        
        return Competition.findOne({attributes:['nb_participant'],where:{id}})
    },
    setWinner:(id_competition,id_vainqueur)=>{
        return Competition.update({vainqueur:id_vainqueur,status:false},{where:{id:id_competition}})
    }

}

module.exports = competitionRepository