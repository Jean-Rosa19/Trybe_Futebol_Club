import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import MatchesService from '../services/MatchesService'
import { matches } from './mocks/mocks'
import MatchesModel from '../database/models/MatchesModel';

chai.use(chaiHttp)


const { expect } = chai;

describe('testes da camada de matchesService', ()=>{
    afterEach(sinon.restore)
    it('testando retorno de todas as partidas', async ()=>{
        sinon.stub(MatchesModel, 'findAll').resolves(matches as unknown as MatchesModel[])
        // const result = await new MatchesService().getAllMatches(undefined);
        // expect(result).to.be.equal(matches)
        const controllerResult = await chai.request(app).get('/matches');
        expect(controllerResult.status).to.be.equal(200);
    })
    it('testando retorno das partidas em progresso', async () => {
        const expectedResult = matches.filter((match) => match.in_progress === 1);
        sinon.stub(MatchesModel, 'findAll').resolves(matches as unknown as MatchesModel[]);
        const result = await new MatchesService().getAllMatches('true');
        expect(result).to.deep.equal(expectedResult);
      });
      it('testando retorno das partidas finalizadas', async () => {
        const expectedResult = matches.filter((match) => match.in_progress === 0);
        sinon.stub(MatchesModel, 'findAll').resolves(matches as unknown as MatchesModel[]);
        const result = await new MatchesService().getAllMatches('false');
        expect(result).to.be.an('array');
      });
    it('testando retorno das partidas', async () => {
        const action = sinon.stub(MatchesModel, 'update').resolves()
        const id = 3
        await (new MatchesService().finishMatcher(id))
        expect(action.calledWith({ inProgress: false }, {
            where: { id },
          })).to.be.true
    });
    it('testando retorno das partidas', async () => {
        const result= [1]
        sinon.stub(MatchesModel, 'update').resolves(result as [affectedCount: number])
        const action = await (new MatchesService().updateMatcher(3,2,1))
        expect(action).to.be.equal(result)
    });

    
})