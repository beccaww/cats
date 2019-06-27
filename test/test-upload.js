'use strict';

const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);


describe('/api/images', function () {
    

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });


  describe('POST', function () {
    it('Should upload a new image', function () {
      return chai
        .request(app)
        .post('/api/images')
        .attach('imageField', fs.readFileSync(`${__dirname}/../images/uploads/images/photo.png`), 'photo')
        .then(res => {
          expect(res).to.have.status(201);
        })
        .catch(e => {
          console.error('errror', e);
          expect(false).to.be.true;
        })
    });
  });
}); 
