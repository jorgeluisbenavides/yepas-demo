const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const {
  describe,
  afterEach,
  beforeEach,
  it,
  after,
} = require('mocha');

const [app, server] = require('../../index');

const {
  ROOT_PATH,
} = require('../../src/configs');

let sandbox;
chai.use(chaiHttp);

describe('HealthCheckController - [TEST]', () => {
  after(async () => server.close());
  describe('GET /health-check/', () => {
    beforeEach(async () => {
      sandbox = sinon.createSandbox();
    });

    afterEach(async () => {
      sandbox.restore();
    });

    it('Should get sussces - HTTP-200', async () => {
      const response = await chai
        .request(app)
        .get(`${ROOT_PATH}/health-check`);

      assert.strictEqual(response.status, 200);
    });

    it('Should get Internal Error - HTTP-500', async () => {
      const errorMessage = 'Internal Server Error';

      sandbox.stub(console, 'info').throws(errorMessage);

      const response = await chai
        .request(app)
        .get(`${ROOT_PATH}/health-check`);

      assert.strictEqual(response.status, 500);
      assert.strictEqual(response.text, errorMessage);
    });
  });
});
