/* global expect supertest*/
'use strict';
const joi = require('@hapi/joi');
const knex = require('knex');
const { PORT, DB_URL } = require('../../src/config');
const app = require('../../src/app');

before(() => {

  const db = knex({
    client: 'pg',
    connection: DB_URL
  });

  app.set('db', db);
});

after(() => {
  app.get('db').destroy();
});

describe('GET /api/reports', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization', () =>{

    it.skip('should respond with a collection (object) of reports for each year (200)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('GET /api/reports/:year', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
    });
  });

  context('with invalid :year', () =>{

    it.skip('should respond with an error (404)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization and :year', () =>{

    it.skip('should respond with the report for the specified year (200)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('GET /api/reports/:year/:month', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/reports/2019/4')
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

  context('with invalid :year', () =>{

    it('should respond with an error (404)', () => {

      return supertest(app)
        .get('/api/reports/INVALID/4')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(resp => {

          const schema = joi.object({
            errors: joi.array().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });

  context('with invalid :month', () =>{

    it('should respond with an error (404)', () => {

      return supertest(app)
        .get('/api/reports/2019/INVALID')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(resp => {

          const schema = joi.object({
            errors: joi.array().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });

  context('with valid Authorization, :year, and :month', () =>{

    it('should respond with the report for the specified month (200)', () => {

      return supertest(app)
        .get('/api/reports/2019/4')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {

          const schema = joi.object({
            incomes  : joi.array().required(),
            expenses : joi.array().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });
});
