import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response } from 'express';


import UserService from '../services/LoginService';
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

})