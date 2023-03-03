import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel'

//import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;


describe('testando a rota teams', () => {
  it('espera-se que o metodo get traga os seguintes times', async()=> {
    //contexto necessario para o teste(arrange)
    const allTeams = [
      {
        id: 1,
        teamName: "Avaí/Kindermann"
      },
      {
        id: 2,
        teamName: "Bahia"
      },
      {
        id: 3,
        teamName: "Botafogo"
      },
      {
        id: 4,
      teamName: "Corinthians"
      },
      {
        id: 5,
      teamName: "Cruzeio"
      } 
    ]
    //solicitação http get (act)
    const response = await chai.request(app).get('/teams')
   // resultado esperado(assert)
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(allTeams);

      it('retorno da rota id', async () => {
        sinon
        .stub(TeamsModel, 'findByPk')
        .resolves(allTeams[0] as TeamsModel)
    
        const res = await chai.request(app).get('/teams/1').send()
    
        expect(res).to.have.status(200)
        expect(res.body).to.deep.equal(TeamsModel[0])
      });

  })
});
