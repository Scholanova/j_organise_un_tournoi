const models = require('../lib/models')
const Competition = models.Competition
const factory = {

    createCompetition: ({
        id = 123,
        name_organisateur = 'Equipe 1',
        name = 'coupe du monde 2022',
        nb_participant = 8,
        status = false
      } = {}) => {
        return new Competition({id, name_organisateur, name, nb_participant, status })
      }
}

module.exports = factory
