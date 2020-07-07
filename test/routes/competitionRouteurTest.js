const Joi = require('@hapi/joi')
const { expect, request, sinon } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const competitionRepository = require('../../lib/repositories/competitionRepository')
const competitionService = require('../../lib/services/competitionServices')
const models = require('../../lib/models')
const competition =new models.competition

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
                expect(response.text).to.contain('No competition in system yet.')
            })
        })
        context('when there are competition in the repository', () => {
            beforeEach(async () => {
                // given
                const competition = new competition({ name_organisateur: 'Equipe 1', name: 'coupe du monde 2022', nb_participant: 8,status:false })
                competitionRepository.listAll.resolves([competition])
                // when
                response = await request(app).get('/competition')
            })
            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })
            it('should return an html list with competition info inside', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Equipe 1')
            })
        })



    })

    describe('new - POST', () => {
        let response
        beforeEach(() => {
            sinon.stub(competitionService, 'create')
        })
        context('when the competition creation succeeds', () => {
            let competition
            beforeEach(async () => {
                // given
                 competition = new competition({ id:12, name_organisateur: 'Equipe 1', name: 'coupe du monde 2022', nb_participant: 8,status:false })
                competitionService.create.resolves(competition)
                // when
                response = await request(app)
                    .post('/competition/new')
                    .type('form')
                    .send({ 'name_organisateur': 'Equipe 1', 'name': 'coupe du monde 2022', 'nb_participant': '1','status':'false' })
                    .redirects(0)
            })
            it('should call the service with competition data', () => {
                // then
                expect(competitionService.create).to.have.been.calledWith({ name_organisateur: 'Equipe 1', name: 'coupe du monde 2022', nb_participant: 8,status:false })
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
                    .send({ name_organisateur: previousNameValue, name: undefined, nb_participant: undefined,status:false })
                    .redirects(0)
            })
            it('should call the service with competition data', () => {
                // then
                expect(competitionService.create).to.have.been.calledWith({
                    name_organisateur: previousNameValue, name: undefined, nb_participant: undefined, status:false
                })
            })
            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })
            it('should show new competition page with error message and previous values', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('New Competition')
                expect(response.text).to.contain("&#34;nb_participant&#34; is required")
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
                competitionRepository.get.rejects(new ResourceNotFoundError())
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
                expect(response.text).to.contain('This page does not exist')
            })
        })
        context('when there is a competition matching in the repository', () => {
            let competition
            beforeEach(async () => {
                // given
                competitionId = '123'
                const competitionData = {
                    id: competitionId, name_organisateur: 'Equipe 1',name:'coupe du monde 2022', nb_participant: 8, status: false
                }
                competition = new competition(competitionData)
                competitionRepository.get.resolves(competition)
                // when
                response = await request(app).get(`/competition/${competitionId}`)
            })
            it('should call the repository with id', () => {
                // then
                expect(competitionRepository.get).to.have.been.calledWith(competitionId)
            })
            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })
            it('should return the show page with the competition', () => {
            // then
            expect(response).to.be.html
            expect(response.text).to.contain(`Competition ${competition.name_organisateur}`)
            expect(response.text).to.contain(`Name: ${competition.name}`)
            expect(response.text).to.contain(`Nombre de participant: ${competition.nb_participant}`)
            expect(response.text).to.contain(`Statue: ${competition.status}`)
        })
    })
})





})