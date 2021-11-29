const expect = require('chai').expect;
const nock = require('nock');
const config = require('dotenv').config();

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

const getUser = require('../Controllers/tickets.controllers').list;
const response = require('./response');

describe('Get Ticket List', () => {
  beforeEach(() => {
    nock(`${process.env.ZENDESK_URL}`)
      .get('/api/v2/tickets')
      .reply(200, response);
  });

  it('Get ticket List success', (done) => {
    chai.request(app)
        .get('/api/tickets/list')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.tickets.length.should.be.eql(3);
            done();
        });
  });
});