import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../api/app';

chai.use(chaiHttp);

describe('ErrorMiddleware', () => {
  it('deve retornar status 500 para erros não conhecidos', async () => {
    const httpResponse = await chai
      .request(app)
      .get('/internal-error');
    expect(httpResponse.status).to.equal(500);
  });
})
