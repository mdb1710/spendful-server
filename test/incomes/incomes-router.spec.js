/* global expect supertest*/
'use strict';
const joi = require('@hapi/joi');
const knex = require('knex');
const { PORT, TEST_DB_URL } = require('../../src/config');
const app = require('../../src/app');

before(() => {

  const db = knex({
    client: 'pg',
    connection: TEST_DB_URL
  });

  app.set('db', db);
});

after(() => {
  app.get('db').destroy();
});

describe('GET /api/incomes', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/incomes')
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

    it('should respond with an array of incomes (200)', () => {

      return supertest(app)
        .get('/api/incomes')
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

describe('POST /api/incomes', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .post('/api/incomes')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({
          category_id: 6,
          description: 'Certain Deeds',
          amount: 29.99,
          start_date: new Date().toISOString(),
          // This name could be renamed to make it more friendly to the consumer
          recurring_rule: null,
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
        .post('/api/incomes')
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
        .post('/api/incomes')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          category_id: 6,
          description: 'Certain Deeds',
          amount: 29.99,
          start_date: new Date().toISOString(),
          // This name could be renamed to make it more friendly to the consumer
          recurring_rule: null,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('GET /api/incomes/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/incomes/1')
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
        .get('/api/incomes/INVALID')
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

    it('should respond with the specified income (200)', () => {

      return supertest(app)
        .get('/api/incomes/1')
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

describe('PATCH /api/incomes/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .patch('/api/incomes/1')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({
          amount: 49.99,
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
        .patch('/api/incomes/INVALID')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          amount: 49.99,
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
        .patch('/api/incomes/1')
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
        .patch('/api/incomes/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          amount: 49.99,
        })
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('DELETE /api/incomes/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .delete('/api/incomes/1')
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
        .delete('/api/incomes/INVALID')
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

    it('should respond with an empty body (204)', () => {

      return supertest(app)
        .delete('/api/incomes/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});
