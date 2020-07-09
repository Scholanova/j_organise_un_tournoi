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
        context('when there is competition', () => {
            beforeEach(()=>{
                // given
                const competition =
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
                
                competitionListAllPromise = competitionService.findAll()
                
            })
            it('should call the competition Repository', async () => {
                // then
                await competitionListAllPromise.catch(() => {})
                expect(competitionRepository.listAll).to.have.been.called
            })
            it('should result to an array', async () => {
                // then
                await competitionListAllPromise.catch(() => {})

                expect(competitionRepository.listAll).to.eventually.deep.equal([competition])
            })
            
        })
        context('when the competition number of participant is not a number pair', () => {
            beforeEach(()=>{
                // given
                // when
                result = { name_organisateur: 'Coupe du monde 2022', name: 'Equipe 1', nb_participant: 1,status:false }

            })
            it('should not call the competition Repository', async () => {
                // then
                await result.catch(() => {})
                expect(competitionRepository.listAll()).to.not.have.been.called
            })
            it('should reject with a ValidationError error about unsupported number of participant', () => {
                // then
                const expectedErrorDetails = [{
                    message: '"number of participant" must be one of [french, english]',
                    path: ['number of participant'],
                    type: 'any.only',
                    context: { label: 'nb_participant', key: 'nb_participant', valids: [2, 4,6,8,10,16,16], 'value': 1 }
                }]
                return expect(result)
                    .to.eventually.be.rejectedWith(Joi.ValidationError)
                    .with.deep.property('details', expectedErrorDetails)
            })
        })
        context('when the competition number of participant is  a number pair', () => {
            beforeEach(()=>{
                // given
                result = { name_organisateur: 'Coupe du monde 2022', name: 'Equipe 1', nb_participant: 8,status:false }
                Competition = competitionService.create(result)
                competitionRepository.listAll().resolves([Competition])
                let nb_participant = 'french'
                // when
                result = competitionService.findAll({nb_participant : nb_participant})
            })
            it('should call the competition Repository with the number of participation pair', async () => {
                // then
                await result.catch(() => {})
                expect(competitionRepository.listAll()).to.have.been.calledWith(nb_participant)
            })
            it('should resolve with the competition listed from reprository', () => {
                // then
                return expect(result).to.eventually.deep.equal([Competition])
            })
        })
    })

})