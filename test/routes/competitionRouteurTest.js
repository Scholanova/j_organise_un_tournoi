const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { RessourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const competitionRepository = require('../../lib/repositories/competitionRepository')
const competitionService = require('../../lib/services/competitionServices')
const matchRepository = require('../../lib/repositories/matchRepository')
const matchService = require('../../lib/services/matchServices')
const participantRepository = require('../../lib/repositories/participantRepository')
const participantService = require('../../lib/services/participantServices')
const models = require('../../lib/models')
const competition = models.Competition
describe('competitionRouter', ()=>{

    describe('list',()=>{
        let response

        beforeEach(()=>{
            sinon.stub(competitionRepository,'listAll')
        })

        context('when there is no competition in the repository', () => {
            beforeEach(async () => {
                // given
                competitionRepository.listAll.resolves([])
                // when
                response = await request(app).get('/competition')
            })
            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })
            it('should return an empty list message', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Pas de competitions en cours')
            })
        })
        context('when there are competition in the repository', () => {
            let competition
            beforeEach(async () => {
                // given
                competition = factory.createCompetition()
                competitionRepository.listAll.resolves([competition])
                // when
                response = await request(app).get('/competition')
            })
            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })
            it('should return an html list with competition name inside', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('coupe du monde 2022')
            })
        })



    })

    describe('new - POST', () => {
        let response
        beforeEach(() => {
            sinon.stub(competitionService, 'create')
            sinon.stub(matchService, 'createAllMatch')
            sinon.stub(participantService, 'createAllParticipant')
        })
        context('when the competition creation succeeds', () => {
            let competition
            beforeEach(async () => {
                // given
                competition = factory.createCompetition()
                competitionService.create.resolves(competition)
                matchService.createAllMatch.resolves([1,2])
                participantService.createAllParticipant.resolves([1,2,3,4])
                // when
                response = await request(app)
                    .post('/competition/new')
                    .type('form')
                    .send({ organisateur: 'Equipe 1',name: 'coupe du monde 2022', nbparticipant: '4' ,participants:['aaaa','bbbb','cccc','dddd'] })
                    .redirects(0)
            })
            it('should call the competitionService with competition data', () => {
                // then
                expect(competitionService.create).to.have.been.calledWith({ name_organisateur: 'Equipe 1', name: 'coupe du monde 2022', nb_participant: '4' })
            })
            it('should call the matchService', () => {
                // then
                expect(matchService.createAllMatch).to.have.been.called
            })
            it('should call the participantService', () => {
                // then
                expect(participantService.createAllParticipant).to.have.been.called;
            })
            it('should succeed with a status 302', () => {
                // then
                expect(response).to.have.status(302)
            })
            it('should redirect to show page', () => {
                // then
                expect(response).to.redirectTo(`/competition/${competition.id}`)
            })
        })
        context('when the competition creation fails with validation errors', () => {
            let validationError
            let errorMessage
            let errorDetails
            let previousNameValue
            beforeEach(async () => {
                // given
                errorDetails = [{
                    message: '"number of participant" is required',
                    path: ['nb_participant'],
                    type: 'any.required',
                    context: { label: 'nb_participant', key: 'nb_participant' }
                }]
                errorMessage = '"number of participant" is required'
                validationError = new Joi.ValidationError(errorMessage, errorDetails, undefined)
                competitionService.create.rejects(validationError)
                previousNameValue = 'Some special name for a organisateur'
                // when
                response = await request(app)
                    .post('/competition/new')
                    .type('form')
                    .send({ organisateur: previousNameValue,participants:['aaaa','bbbb','cccc','dddd'] })
                    .redirects(0)
            })
            it('should call the service with competition data', () => {
                // then
                expect(competitionService.create).to.have.been.calledWith({
                    name_organisateur: previousNameValue, name: undefined, nb_participant: undefined
                })
            })
            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })
            it('should show new competition page with error message and previous values', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Compétition')
                expect(response.text).to.contain(previousNameValue)
            })
        })
    })
    describe('bracket', () => {
        let competitionId
        let response
        beforeEach(() => {
            sinon.stub(competitionRepository, 'get')
        })
        context('when there is no comepetition matching in the repository', () => {
            beforeEach(async () => {
                // given
                competitionId = '123'
                competitionRepository.get.rejects(new RessourceNotFoundError())
                // when
                response = await request(app).get(`/competition/${competitionId}`)
            })
            it('should call the repository with id', () => {
                // then
                expect(competitionRepository.get).to.have.been.calledWith(competitionId)
            })
            it('should succeed with a status 404', () => {
                // then
                expect(response).to.have.status(404)
            })
            it('should return the resource not found page', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('')
            })
        })
        
})





})