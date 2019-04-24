/* global expect supertest*/
'use strict';

const app = require('../../src/app');

describe('POST /api/auth/login', () => {

  context('with invalid body (or credentials)', () =>{

    it.skip('should respond with an error (400)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid body (and credentials)', () =>{

    it.skip('should respond with an auth token (200)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('GET /api/auth/refresh', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization', () =>{

    it.skip('should respond with an auth token (200)', () => {
      expect(false).to.be.true();
    });
  });
});
