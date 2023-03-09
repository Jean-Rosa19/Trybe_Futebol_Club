import * as sinon from 'sinon';
import * as chai from 'chai';

import { Request, Response } from 'express';
import { expectedResultTeams } from './mocks/mocks';

import TeamService from '../services/TeamsServices'
import TeamsController from '../controllers/TeamsController'

const { expect } = chai;

describe('testando a camada TeamsController', ()=>{
    it('retornos esperados', async()=>{
    const req = {}
    const res = {
        json: sinon.stub(),
        status: sinon.stub().resolves()
    }  
    await (new TeamsController().getAllTeams(req as Request, res as unknown as Response))
    expect(res.json.calledWith(expectedResultTeams)).to.be.true
    expect(res.status.calledWith(200)).to.be.true
})
        

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
