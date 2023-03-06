import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response } from 'express';

import chaiHttp from 'chai-http';
import { expectedResultTeams } from './mocks/mocks'
import TeamService from '../services/TeamsServices'
import TeamsController from '../controllers/TeamsController'

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a camada TeamsController', ()=>{
    afterEach(sinon.restore)

    it('testando retorno de times',async ()=>{
        const req = {}
        const res = {
            json: sinon.stub(),
            status: sinon.stub()
        } 
        sinon.stub(new TeamService, 'getAllTeams').resolves(expectedResultTeams)
       await (new TeamsController().getAllTeams(req as Request,res as unknown as Response))
        expect(res.json.calledWith(expectedResultTeams)).to.be.true
        expect(res.status.calledWith(200)).to.be.true
    });
    it('testando retorno de um unico time',async ()=> {
        const req = { params: {id: "1"} }
        const res = {
            json: sinon.stub(),
            status: sinon.stub()
        } 

        sinon.stub(new TeamService, 'getTeamsById').resolves(expectedResultTeams[0])
       await  (new TeamsController().getAllTeams(req as unknown as Request,res as unknown as Response))
        expect(res.json.calledWith(expectedResultTeams[0])).to.be.true
        expect(res.status.calledWith(200)).to.be.true
        
    })

})