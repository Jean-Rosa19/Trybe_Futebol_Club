import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Request, Response } from 'express';
import { app } from '../app';


// import UserService from '../services/LoginService';
import UserController from '../controllers/LoginController';

const { expect } = chai;

describe('testando a rota login', ()=>{
    afterEach(sinon.restore)
    it('testa se o status 200 e o token é apresentado', async ()=>{
        //arrange
        const expectedResponse = {
            token: "liuashfaiojdçfoak~fodpauhapçhd"
        }
        const req = {
            body: {email: 'teste@teste.com'}
        }
        const res = {
            json: sinon.stub().resolves(),
            status: sinon.stub()
        } 
        res.status =  sinon.stub().returns(res);
        
        const controllerInstance = new UserController()
        sinon.stub(controllerInstance._service, 'login').resolves(expectedResponse.token)
        await (controllerInstance.login(req as Request, res as unknown as Response));

        expect(res.status.calledWith(200)).to.be.true
        expect(res.json.calledWith(expectedResponse)).to.be.true
       


    });

      it('validação para email e status 400', async () => {
        const email = await chai
          .request(app)
          .post('/login')
          .send({ email: '', password:  'secret_admin'});
        expect(email.status).to.equal(400)
        expect(email.body).to.deep.equal({ message: 'All fields must be filled' })
      });
      it('para dados invalidos retorna 401 e mensagem esperada', async () => {
        const data = await chai
          .request(app)
          .post('/login')
          .send({ email: 'teste@teste.com', password:  '123456'});
        expect(data.status).to.equal(401)
        expect(data.body).to.deep.equal({ message: 'Invalid email or password' })
      });
    
    });
