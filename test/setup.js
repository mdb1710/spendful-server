'use strict';

require('dotenv').config();

process.env.TZ       = 'UTC';
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;

global.VALID_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJmdWxsX25hbWUiOiJTcGVuZGZ1bCBBZG1pbiJ9.ylf7unVD3FDiLV2EdW2S3ddWlTixrbuorSm29HwaBDE';
