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

describe('GET /api/users', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/users')
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

    it.skip('should respond with an array of users (200)', () => {

      return supertest(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {

          const schema = joi.object({
            users: joi.array().required(),
          });

          joi.assert(resp.body, schema);
        });
    });
  });
});

describe('POST /api/users', () => {

  context('with an invalid body', () =>{

    it('should respond with an error (400)', () => {

      return supertest(app)
        .post('/api/users')
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

  context('with email address already in database', () => {

    it.skip('should respond with an error (400)', () => {

      return supertest(app)
        .post('/api/users')
        .send({
          // ?????
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

  context('with a valid body', () =>{

    it('should respond with a Location header and an empty body (201)', () => {

      return supertest(app)
        .post('/api/users')
        .send({
          full_name     : 'John Doe',
          // FIXME using Date.now() is a hack because we aren't currently
          // seeding and un-seeding a test database yet
          email_address : `jdoe${Date.now()}@anon.com`,
          password      : 'LongerPassword',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .expect('Location', /\/api\/users\//)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('GET /api/users/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .get('/api/users/1')
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
        .get('/api/users/INVALID')
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

    it.skip('should respond with the specified user (200)', () => {

      return supertest(app)
        .get('/api/users/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('PATCH /api/users/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .patch('/api/users/1')
        .set('Authorization', 'Bearer INVALID_TOKEN')
        .send({
          full_name: 'My silly halloween name'
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

    it.skip('should respond with an error (404)', () => {

      return supertest(app)
        .patch('/api/users/INVALID')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          full_name: 'My silly halloween name'
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

    it.skip('should respond with an error (400)', () => {

      return supertest(app)
        .patch('/api/users/1')
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

    it.skip('should respond with an empty body (204)', () => {

      return supertest(app)
        .patch('/api/users/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .send({
          full_name: 'My silly halloween name'
        })
        .expect('Content-Type', /json/)
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});

describe('DELETE /api/users/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {

      return supertest(app)
        .delete('/api/users/1')
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
        .delete('/api/users/INVALID')
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
        .delete('/api/users/1')
        .set('Authorization', `Bearer ${VALID_AUTH_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(204)
        .then(resp => {
          // TODO joi.assert(resp, someSchema);
        });
    });
  });
});
