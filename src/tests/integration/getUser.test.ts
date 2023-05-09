import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { Model } from 'sequelize';
import { app } from '../../api/app';
import User from '../../database/models/UserModel';

chai.use(chaiHttp);

describe('GET /users/:id', () => {
  describe('caso o id informado não for encontrado', () => {
    afterEach(sinon.restore);
    it('deve retornar um status 404', async () => {
      sinon.stub(Model, 'findByPk').resolves(null);
      const httpResponse = await chai
        .request(app)
        .get('/users/1');
      expect(httpResponse.status).to.be.equal(404);
      expect(httpResponse.body).to.be.deep.equal({ error: 'usuário não encontrado' });
    });
  });

  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200', async () => {
      const user = {
        id: 1,
        username: 'Tryber',
        email: 'tryber@mail.com',
        password: '123456',
      };
      sinon.stub(Model, 'findByPk').resolves(user as User);

      const httpResponse = await chai
        .request(app)
        .get('/users/1');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal({
        id: 1,
        username: 'Tryber',
        email: 'tryber@mail.com',
      });
    });
  });
});
