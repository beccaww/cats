'use strict';

const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

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
describe('/api/images', function () {
  describe('POST', function () {
    it('Should upload a new image', function (done) {
      return chai
        .request(app)
        .post('/api/images')
        .attach('imageField', fs.readFileSync(`${__dirname}/../images/uploads/images/photo.png`), 'photo')
        .then(res => {
          expect(res).to.have.status(201);
          done();
        })
        .catch(e => {
          expect(false).to.be.true;
          done(e);
        })
    });
  });
}); 
