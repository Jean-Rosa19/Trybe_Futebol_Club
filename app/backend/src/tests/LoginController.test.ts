import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response } from 'express';

import chaiHttp from 'chai-http';
import UserService from '../services/LoginService';
import UserController from '../controllers/LoginController';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota login', ()=>{
    it('testa se o status 200 e o token é apresentado', async ()=>{
        //arrange
        const expectedResponse = {
            token: "liuashfaiojdçfoak~fodpauhapçhd"
        }
        const req = {
            body: {}
        }
        const res = {
            json: sinon.stub(),
            status: sinon.stub()
        } 
      
        sinon.stub(new UserService, 'login').resolves(expectedResponse.token)
        new UserController().login(req as Request, res as unknown as Response);

        expect(res.json.calledWith(expectedResponse)).to.be.true
        expect(res.status.calledWith(200)).to.be.true


    });


})