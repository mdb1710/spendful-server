/* global expect supertest*/
'use strict';

const app = require('../../src/app');

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

    it.skip('should respond with an error (401)', () => {
      expect(false).to.be.true();
    });
  });

  context('with invalid :year', () =>{

    it.skip('should respond with an error (404)', () => {
      expect(false).to.be.true();
    });
  });

  context('with invalid :month', () =>{

    it.skip('should respond with an error (404)', () => {
      expect(false).to.be.true();
    });
  });

  context('with valid Authorization, :year, and :month', () =>{

    it.skip('should respond with the report for the specified month (200)', () => {
      expect(false).to.be.true();
    });
  });
});
