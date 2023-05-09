import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { Model } from 'sequelize';
import { app } from '../../api/app';
import User from '../../database/models/UserModel';

chai.use(chaiHttp);

describe('POST /users', function() {
  afterEach(sinon.restore);

  describe('quando algum parametro obrigatório não é informado', function() {
    it('deve retornar status 400 caso o username não seja informado', async function() {
      const httpResponse = await chai.request(app).post('/users').send({});
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ error: 'username é obrigatório' });
    });

    it('deve retornar status 400 caso o email não seja informado', async function() {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          username: 'any_username',
        });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ error: 'email é obrigatório' });
    });

    it('deve retornar status 400 caso o password não seja informado', async function() {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          username: 'any_username',
          email: 'email@mail.com',
        });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ error: 'password é obrigatório' });
    });
  });

  describe('quando algum parametro for inválido', function() {
    it('deve retornar status 400 caso o username tiver menos de 4 caracteres', async function() {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          username: 'any',
          email: 'email@mail.com',
          password: 'any_password',
        });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ error: 'username precisa ter mais que 3 caracteres' });
    });

    it('deve retornar status 400 caso o email for inválido', async function() {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          username: 'any_username',
          email: 'email_inválido',
          password: 'any_password',
        });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ error: 'email deve ser um email válido' });
    });

    it('deve retornar status 400 caso o password for menor que 6 caracteres', async function() {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          username: 'any_username',
          email: 'email@mail.com',
          password: '12345',
        });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ error: 'password deve ter ao menos 6 caracteres' });
    });
  });

  describe('quando o email já estiver cadastrado no bando de dados', function() {
    it('deve retornar um status 409', async function() {
      const user = {
        id: 1,
        username: 'Tryber',
        email: 'tryber@mail.com',
        password: '123456',
      };
      sinon.stub(Model, 'findOne').resolves(user as User);
      const httpResponse = await chai.request(app)
        .post('/users')
        .send({
          username: 'Tryber',
          email: 'tryber@mail.com',
          password: '123456',
        });
      expect(httpResponse.status).to.be.equal(409);
      expect(httpResponse.body).to.be.deep.equal({ error: 'Usuário já existe' });
    });
  });

  describe('quando a requisição é feita com sucesso', function() {
    it('deve retornar um status 201', async function() {
      const createdUser = {
        id: 1,
        username: 'Tryber',
        email: 'tryber@mail.com',
        password: '123456',
      };
      sinon.stub(Model, 'findOne').resolves(null);
      sinon.stub(Model, 'create').resolves(createdUser as User);

      const httpResponse = await chai.request(app)
        .post('/users')
        .send({
          username: 'Tryber',
          email: 'tryber@mail.com',
          password: '123456',
        });
      expect(httpResponse.status).to.be.equal(201);
      expect(httpResponse.body).to.be.deep.equal({
        id: 1,
        username: 'Tryber',
        email: 'tryber@mail.com',
      });
    });
  });
});
