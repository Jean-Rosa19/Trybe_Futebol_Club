import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import UsersModel from '../database/models/UsersModel';
import {Model} from 'sequelize'
import UserService from '../services/LoginService';
import bcrypt from 'bcryptjs'

chai.use(chaiHttp);

const { expect } = chai;

describe('teste camada login service', ()=>{
    afterEach(sinon.restore)
    it('testando acertos e falhas ao fazer login', async ()=>{
        const inputData = {email:'teste@teste.com', password: '123456'}
        const user = {dataValues: {id: 1, username: 'user', role:'admin', email:'teste@teste.com', password: bcrypt.hashSync('123456', 5)}}

        sinon.stub(UsersModel, 'findOne').resolves(user as Model)
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjNkIn0.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTUxNjIzOTAyMn0.9scITnwOt0LJbV1d3Q1Gy27p0NncL07qnmqJSzsThSw'
        const result = await (new UserService().login(inputData))
        console.log(result)
        expect(result).to.be.equal(token)
    })
    it('testando falha com senhas inválidas', async ()=>{
        const inputData = {email:'teste@teste.com', password: '123456'}
        const user = {dataValues: {id: 1, username: 'user', role:'admin', email:'teste@teste.com', password: bcrypt.hashSync('1234567', 5)}}

        sinon.stub(UsersModel, 'findOne').resolves(user as Model)
        
        expect(await (new UserService().login(inputData))).Throw(new Error('Invalid email or password'))
    })
    it('teste em caso de sucesso para encontrar o login', async ()=>{
        const user = {dataValues: {id: 1, username: 'user', role:'admin', email:'teste@teste.com', password: bcrypt.hashSync('123456', 5)}}
        const {id, username, email} = user.dataValues
        sinon.stub(UsersModel, 'findOne').resolves(user as Model)
        const result = await (new UserService().loginRole(id, username, email))
        expect(result).to.be.equal(user.dataValues.role)
    })
   
})