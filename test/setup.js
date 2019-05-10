'use strict';

require('dotenv').config();

process.env.TZ       = 'UTC';
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

global.expect = expect;
global.supertest = supertest;

// Create a JWT that never expires

const payload = {
  user_id: 1,
  full_name: 'Spendful Admin',
};

global.VALID_AUTH_TOKEN = jwt.sign(payload, process.env.JWT_SECRET);
