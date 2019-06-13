'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { Upload } = require('../upload');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

// before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   after(function () {
//     return closeServer();
//   });

//should test if uploads a new image
//should test POST
//should have status 201
describe('/upload', function () {
    describe('POST', function () {
        it('Should upload a new image', function () {
          return chai
          .request(app)
          .post('/upload')
          .then(res => {
            expect(res).to.have.status(201);
          });
        })
    });
}); 