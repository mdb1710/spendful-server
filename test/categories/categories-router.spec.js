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
describe('GET /api/categories', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/categories')
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

    it('should respond with an array of categories (200)', () => {

      return supertest(app)
        .get('/api/categories')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {

          const schema = joi.array()

          joi.assert(resp.body, schema);
        });
    });
  });
});

describe('POST /api/categories', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .post('/api/categories')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({
          name: 'Totally Legal',
          type: 'income',
          monthly_budget: 100,
        })
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

  context('with an invalid body', () =>{

    it('should respond with an error (400)', () => {

      return supertest(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          foobar: 'foobar',
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

  context('with valid Authorization and body', () =>{

    it('should respond with a Location header and an empty body (201)', () => {

      return supertest(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          name: 'Totally Legal',
          type: 'income',
          monthly_budget: 100,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('GET /api/categories/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/categories/1')
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

  context('with invalid :id', () =>{

    it('should respond with an error (404)', () => {

      return supertest(app)
        .get('/api/categories/INVALID')
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

  context('with valid Authorization and :id', () =>{

    it('should respond with the specified category (200)', () => {

      return supertest(app)
        .get('/api/categories/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {

          const schema = joi.object();

          joi.assert(resp.body, schema);
        });
    });
  });
});

describe('PATCH /api/categories/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .patch('/api/categories/1')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({
          monthly_budget: 200,
        })
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

  context('with invalid :id', () =>{

    it('should respond with an error (404)', () => {

      return supertest(app)
        .patch('/api/categories/INVALID')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          monthly_budget: 200,
        })
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

  context('with invalid body', () =>{

    it('should respond with an error (400)', () => {

      return supertest(app)
        .patch('/api/categories/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          foobar: 'foobar'
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

  context('with valid Authorization, :id, and body', () =>{

    it('should respond with an empty body (204)', () => {

      return supertest(app)
        .patch('/api/categories/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          monthly_budget: 200,
        })
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('DELETE /api/categories/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .delete('/api/categories/1')
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

  context('with invalid :id', () =>{

    it('should respond with an error (404)', () => {

      return supertest(app)
        .delete('/api/categories/INVALID')
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

  context('with valid Authorization and :id and category not empty', () =>{

    it('should respond with an empty body (204)', () => {

      return supertest(app)
        .delete('/api/categories/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });

  context('with valid Authorization and :id and category is empty', () =>{

    it('should respond with an empty body (204)', () => {

      return supertest(app)
        .delete('/api/categories/18')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});
