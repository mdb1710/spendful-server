/* global expect supertest*/

'use strict';

const joi        = require('@hapi/joi');
const knex       = require('knex');
const { DB_URL } = require('../../src/config');
const app        = require('../../src/app');

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

describe('GET /api/expenses', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/expenses')
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

    it('should respond with an array of expenses (200)', () => {

      return supertest(app)
        .get('/api/expenses')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {

          const schema = joi.array();

          joi.assert(resp.body, schema);
        });
    });
  });
});

describe('POST /api/expenses', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .post('/api/expenses')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({
          category_id: 1,
          description: 'This months rent',
          amount: 299.99,
          start_date: new Date().toISOString(),
          // This name could be renamed to make it more friendly to the consumer
          // This value will be translated into an RRule for the DB
          recurring_rule: 'Monthly',
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
        .post('/api/expenses')
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
        .post('/api/expenses')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          category_id: 1,
          description: 'This months rent',
          amount: 299.99,
          start_date: new Date().toISOString(),
          // This name could be renamed to make it more friendly to the consumer
          // This value will be translated into an RRule for the DB
          recurring_rule: 'Monthly',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('GET /api/expenses/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/expenses/1')
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
        .get('/api/expenses/INVALID')
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

    it('should respond with the specified expense (200)', () => {

      return supertest(app)
        .get('/api/expenses/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {

          const schema = joi.object().required();

          joi.assert(resp.body, schema);
        });
    });
  });
});

describe('PATCH /api/expenses/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .patch('/api/expenses/1')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({
          description: 'Mortgage'
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
        .patch('/api/expenses/INVALID')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          description: 'Mortgage'
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
        .patch('/api/expenses/1')
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
        .patch('/api/expenses/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          description: 'Mortgage'
        })
        // .expect('Content-Type', /json/)
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('DELETE /api/expenses/:id', () => {

  context('with invalid Authorization', () =>{

    it('should respond with an error (401)', () => {

      return supertest(app)
        .delete('/api/expenses/1')
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

    it.skip('should respond with an error (404)', () => {

      return supertest(app)
        .delete('/api/expenses/INVALID')
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

    it.skip('should respond with an empty body (204)', () => {

      return supertest(app)
        .delete('/api/expenses/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});
