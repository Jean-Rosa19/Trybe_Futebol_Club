import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import MatchesService from '../services/MatchesService'
import { matches } from './mocks/mocks'
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import TeamService from '../services/TeamsServices';
import validateMatcher  from '../middlewares/matchesValidation';
import { Request, Response, NextFunction } from 'express';

chai.use(chaiHttp)


const { expect } = chai;

describe('testes da camada de matchesService', ()=>{
    afterEach(sinon.restore)
    it('testando retorno de todas as partidas', async ()=>{
        sinon.stub(MatchesModel, 'findAll').resolves(matches as unknown as MatchesModel[])
        const controllerResult = await chai.request(app).get('/matches');
        expect(controllerResult.status).to.be.equal(200);
    })

    it('Testando camada controler - getById', async () => {
      const teams :TeamsModel = new TeamsModel({ id: 1, teamName: 'Teste' });
      sinon.stub(TeamsModel, 'findByPk').resolves(teams);
      const teamService = new TeamService();
  
      const result = await chai.request(app).get('/teams/1');
  
      expect(result).to.be.an('object');
      expect(result.body).to.be.an('object');
      expect(result.body).to.be.deep.eq(teams.dataValues);
    });

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
        const result= [1]
        sinon.stub(MatchesModel, 'update').resolves(result as [affectedCount: number])
        const action = await (new MatchesService().updateMatcher(3,2,1))
        expect(action).to.be.equal(result)
    });

    it('Deve retornar o papel do usuário', (done) => {
      chai
        .request(app)
        .get('/login/role')
        .set('Authorization', 'token_jwt')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.have.property('role');
          done();
        });
    });
    it('testando que /leaderboard/home tenha o resultado esperado', async () => {
      const result = await chai
         .request(app).get('/leaderboard/home');
  
      expect(result.status).to.be.deep.equal(200);
    });
    
    describe('myMiddleware', () => {
      it('should call next without errors', () => {
        const req = {} as Request;
        const res = {} as Response;
        const next =  sinon.spy();
    
        validateMatcher(req, res, next);
    
        expect(next.calledOnce).to.be.true;
      });
    });
  });
  