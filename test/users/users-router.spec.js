/* global expect supertest*/
'use strict';

const app = require('../../src/app');

describe('GET /api/users', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/users')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with valid Authorization', () =>{

    it.skip('should respond with an array of users (200)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('POST /api/users', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/users')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with an invalid body', () =>{

    it.skip('should respond with an error (400)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization and body', () =>{

    it.skip('should respond with a Location header and an empty body (201)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('GET /api/users/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/users')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with invalid :id', () =>{

    it.skip('should respond with an error (404)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization and :id', () =>{

    it.skip('should respond with the specified user (200)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('PATCH /api/users/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/users')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with invalid :id', () =>{

    it.skip('should respond with an error (404)', () => {
      expect(false).to.be.true();
    });
  });

  context('with invalid body', () =>{

    it.skip('should respond with an error (400)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization, :id, and body', () =>{

    it.skip('should respond with an empty body (204)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('DELETE /api/users/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/users')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with invalid :id', () =>{

    it.skip('should respond with an error (404)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization and :id', () =>{

    it.skip('should respond with an empty body (204)', () => {
      expect(false).to.be.true();
    });
  });
});
