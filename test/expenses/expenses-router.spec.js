/* global expect supertest*/
'use strict';

const app = require('../../src/app');

describe('GET /api/expenses', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization', () =>{

    it.skip('should respond with an array of expenses (200)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('POST /api/expenses', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
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

describe('GET /api/expenses/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
    });
  });

  context('with invalid :id', () =>{

    it.skip('should respond with an error (404)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization and :id', () =>{

    it.skip('should respond with the specified expense (200)', () => {
      expect(false).to.be.true();
    });
  });
});

describe('PATCH /api/expenses/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
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

describe('DELETE /api/expenses/:id', () => {

  context('with invalid Authorization', () =>{

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
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
