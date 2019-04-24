/* global expect supertest*/
'use strict';

const joi = require('@hapi/joi');
const app = require('../../src/app');

// TODO MVP
describe('POST /api/auth/login', () => {

  context('with invalid body (or credentials)', () =>{

    it.skip('should respond with an error (400)', () => {

      return supertest(app)
        .post('/api/auth/login')
        .send({
          email_address : 'INVALID',
          password      : 'INVALID',
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with valid body (and credentials)', () =>{

    it.skip('should respond with an auth token (200)', () => {

      return supertest(app)
        .post('/api/auth/login')
        .send({
          email_address : 'admin@spendful.com',
          password      : 'password',
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(resp => {

          const schema = joi.object({
            token: joi.string().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });
});

// TODO MVP
describe('GET /api/auth/refresh', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/auth/refresh')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with valid Authorization', () =>{

    it.skip('should respond with an auth token (200)', () => {

      return supertest(app)
        .get('/api/auth/refresh')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {

          const schema = joi.object({
            token: joi.string().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });
});
