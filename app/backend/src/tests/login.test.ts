import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

import {
  fullBody,
  noEmail,
  noPassword,
  invalidEmail,
  invalidPassword,
  userMock,
  response,
  INVALID_ERROR,
  FIELD_ERROR,
} from './mocks/login.mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o sucesso na requisicao POST da rota Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('sucesso na requisicao', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(fullBody)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.deep.equal(response);
  });

});

describe('Testa as falhas na requisicao POST da rota Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('falha na requisicao caso o email seja invalido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidEmail)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(INVALID_ERROR);
  });

  it('falha na requisicao caso a senha seja invalida', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidPassword)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(INVALID_ERROR);
  });

  it("falha na requisicao caso o campo 'email' esteja vazio", async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(noEmail)

    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body.message).to.be.equal(FIELD_ERROR)
  });

  it("falha na requisicao caso o campo 'senha' esteja vazio", async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(noPassword)

    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body.message).to.be.equal(FIELD_ERROR)
  });

});

describe('Testa o sucesso na requisicao GET da rota Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it("sucesso na verificacao do token", async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY1NTg1NDE2MiwiZXhwIjoxNjU1OTQwNTYyfQ.XyqKEFYxRNA_83kkFADhw-CcqHH2inF2nyA7e4Z3SUg')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal('admin');
  });

});

describe('Testa as falhas na requisicao GET da rota Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it("falha na verificacao caso o usuario nao exista", async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY1NTg1NDE2MiwiZXhwIjoxNjU1OTQwNTYyfQ.XyqKEFYxRNA_83kkFADhw-CcqHH2inF2nyA7e4Z3SUg')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('User does not exist');
  });

  it("falha na verificacao caso token seja invalido", async () => {

    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', 'failedToken')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Expired or invalid token');
  });

  it("falha na verificacao caso token nao exista", async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });

});
