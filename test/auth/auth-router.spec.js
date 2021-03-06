/* global expect supertest*/

'use strict';

const joi             = require('@hapi/joi');
const knex            = require('knex');
const { TEST_DB_URL } = require('../../src/config');
const app             = require('../../src/app');
const db              = require('../helpers/database');

before(() => {

  const db = knex({
    client: 'pg',
    connection: TEST_DB_URL
  });

  app.set('db', db);
});

beforeEach(() => {
  return db.createDatabase();
});

afterEach(() => {
  return db.destroyDatabase();
});

after(() => {
  app.get('db').destroy();
});

describe('POST /api/auth/login', () => {

  context('with invalid body (or credentials)', () =>{

    it('should respond with an error (400)', () => {

      return supertest(app)
        .post('/api/auth/login')
        .send({
          email_address : 'INVALID',
          password      : 'INVALID',
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(resp => {

          const schema = joi.object({
            errors: joi.array().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });

  context('with valid body (and credentials)', () =>{

    it('should respond with an auth token (200)', () => {

      return supertest(app)
        .post('/api/auth/login')
        .send({
          email_address : 'admin@spendful.com',
          password      : 'password',
        })
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


describe('GET /api/auth/refresh', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/auth/refresh')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(resp => {

          const schema = joi.object({
            errors: joi.array().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });

  context('with valid Authorization', () =>{

    it('should respond with an auth token (200)', () => {

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
