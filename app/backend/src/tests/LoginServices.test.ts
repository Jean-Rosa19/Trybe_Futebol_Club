import * as sinon from 'sinon';
import * as chai from 'chai';

import UsersModel from '../database/models/UsersModel';
import {Model} from 'sequelize'
import UserService from '../services/LoginService';
import {hashSync} from 'bcryptjs'
import { app } from '../app';


const { expect } = chai;

describe('teste camada login service', ()=>{
    afterEach(sinon.restore)
   

    it('testando acertos e falhas ao fazer login', async ()=>{
        const inputData = {email:'teste@teste.com', password: '123456'}
        const user = {dataValues: {id: 1, username: 'user', role:'admin', email:'teste@teste.com', password: hashSync('123456', 3)}}

        sinon.stub(UsersModel, 'findOne').resolves(user as Model)
        const tokenLength = 196
        const result = await (new UserService().login(inputData))
        console.log(result)
        expect(result.length).to.be.equal(tokenLength)
    })
    it('testando falha com senhas inválidas', async ()=>{
        const inputData = {email:'teste@teste.com', password: '123456'}
        const user = {dataValues: {id: 1, username: 'user', role:'admin', email:'teste@teste.com', password: hashSync('1234567', 3)}}

        sinon.stub(UsersModel, 'findOne').resolves(user as Model)
        const action = await (new UserService().login(inputData))
        expect(action).to.be.equal('Invalid email or password')
    })
    it('teste em caso de sucesso para encontrar o login', async ()=>{
        const user = {id: 1, username: 'user', role:'admin', email:'teste@teste.com', password: hashSync('123456', 3)}
        const {id, username, email} = user
        sinon.stub(UsersModel, 'findOne').resolves(user as unknown as Model)
        const result = await (new UserService().loginRole(id, username, email))
        expect(result).to.be.equal(user.role)
    });
   
})