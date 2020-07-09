const { expect, sinon,factory } = require('../testHelper')
const competitionService = require('../../lib/services/competitionServices')
const competitionRepository = require('../../lib/repositories/competitionRepository')
const Joi = require('@hapi/joi')
let Competition = require('../../lib/models').competition

describe('competitionService', () => {
    describe('create', () => {
        let competitionData
        let competitionCreationPromise
        beforeEach(() => {
            sinon.stub(competitionRepository, 'create')
        })
        context('when the competition data is valid', () => {
            let competition
            beforeEach(() => {

                
                // given
                competitionData = { name_organisateur: 'Equipe 1', name: 'coupe du monde 2022', nb_participant: 8,status:false }
                competition = factory.createCompetition()
                competitionRepository.create.resolves(competition)
                // when
                competitionCreationPromise = competitionService.create(competitionData)
            })
            // then
            it('should call the competition Repository with the creation data', async () => {
                // then
                await competitionCreationPromise.catch(() => {})
                expect(competitionRepository.create).to.have.been.calledWith(competitionData)
            })
            it('should resolve with the created competition from reprository', () => {
                // then
                return expect(competitionCreationPromise).to.eventually.equal(competition)
            })
        })
    })
    describe('findAll', () => {
        let result
        beforeEach(() => {
            sinon.stub(competitionRepository, 'listAll')
        })
        context('when there is one competition', () => {

            let competition

            beforeEach(()=>{
                // given
                competition =
                    {
                        id: 42000,
                        name_organisateur: 'Benoit',
                        name: 'tounoi smash bros ultimate',
                        nb_participant: 8,
                        status: true,
                        vainqueur: 42001
                    }
                
                competitionRepository.listAll.resolves([competition])
                // when
                
                competitionFindAllPromise = competitionService.findAll()
                
            })
            it('should call the competition Repository', async () => {
                // then
                await competitionFindAllPromise.catch(() => {})
                expect(competitionRepository.listAll).to.have.been.calledWith(undefined)
            })
            it('should result to an array', async () => {
                // then
                const returnCompetitions = await competitionFindAllPromise.catch(() => {})

                expect(returnCompetitions).to.deep.equal([competition])
            })
            
        })
    })

})