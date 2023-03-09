import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response } from 'express';

import { matches } from './mocks/mocks'
import MatcheService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController'
import MatchesModel from '../database/models/MatchesModel';



const { expect } = chai;

describe('testando matchesController',()=>{
    afterEach(sinon.restore)
    it('retorno de todas as matches em progresso e status 200', async ()=>{
        
        const req = {
            body: {}
        }
        const res = {
            json: sinon.stub(),
            status: sinon.stub()
        } 
        sinon.stub(new MatcheService, 'getAllMatches').resolves(matches as unknown as MatchesModel[])
       await (new MatchesController().getAllMatches(req as Request,res as unknown as Response))
        expect(res.status.calledWith(200)).to.be.true
        expect(res.json.calledWith(matches)).to.be.true
       
    })

    it('testando se a partida foi finalizada', async ()=>{
        const id = 1
        const req = {
           params: {id},
        }  
        const res = {
            json: sinon.stub(),
            status: sinon.stub()
        } 
        sinon.stub(new MatcheService,'finishMatcher').resolves()
        await new MatchesController().finishMatcher(req as unknown as Request,res as unknown as Response)
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ message: 'Finished' })).to.be.true;
    })
//     it('testando a atualização de uma partida', ()=>{
        
//     })
 })
