'use strict';

process.env.TZ       = 'UTC';
process.env.NODE_ENV = 'test';

require('dotenv').config();

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;

global.VALID_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJmdWxsX25hbWUiOiJTcGVuZGZ1bCBBZG1pbiIsImlhdCI6MTU1NjExODgyOH0.yJbhszxxQy1fQSvCwgdPLIuvnQQfK1elrJBQjdlYg6o';
