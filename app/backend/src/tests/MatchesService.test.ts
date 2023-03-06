import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import MatchesService from '../services/MatchesService'
import { matches } from './mocks/mocks'
import MatchesModel from '../database/models/MatchesModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('testes da camada de matchesService', ()=>{
    afterEach(sinon.restore)
    it('testando retorno das partidas', async ()=>{
        sinon.stub(MatchesModel, 'findAll').resolves(matches as unknown as MatchesModel[])
       expect(await (new MatchesService().getAllMatches(undefined))).to.be.equal(matches)
    })
    it('testando retorno das partidas', async ()=>{
        const expectedResult = matches.filter((element)=> element.inProgress === true)
        sinon.stub(MatchesModel, 'findAll').resolves(matches as unknown as MatchesModel[])
       expect(await (new MatchesService().getAllMatches('true'))).to.be.equal(expectedResult)
    })
    it('testando retorno das partidas', async ()=>{
        const expectedResult = matches.filter((element)=> element.inProgress === false)
        sinon.stub(MatchesModel, 'findAll').resolves(matches as unknown as MatchesModel[])
       expect(await (new MatchesService().getAllMatches('false'))).to.be.equal(expectedResult)
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