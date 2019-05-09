const fs              = require('fs');
const path            = require('path');
const Postgrator      = require('postgrator');
const { TEST_DB_URL } = require('../../src/config');

const postgrator = new Postgrator({
  driver             : 'pg',
  connectionString   : TEST_DB_URL,
  // ssl                : true,
  migrationDirectory : path.join(__dirname, '/../../migrations/'),
});



const confirmEmpty = function () {

  return Promise.resolve();

  // TODO it would be great if I could get this working

  // const checkEmpty = function (results) {
  //   if (results.rows.length > 0) {
  //     return Promise.reject(new Error('NOT_EMPTY'));
  //   }
  // };

  // return Promise
  //   .all([
  //     postgrator.runQuery('SELECT * FROM users').then(checkEmpty),
  //     postgrator.runQuery('SELECT * FROM categories').then(checkEmpty),
  //     postgrator.runQuery('SELECT * FROM incomes').then(checkEmpty),
  //     postgrator.runQuery('SELECT * FROM expenses').then(checkEmpty),
  //   ])
  //   .then(() => { console.log('DB is empty, good') })
  //   .catch((err) => {

  //     if (/relation .+ does not exist/.test(err.message)) {
  //       return Promise.resolve();
  //     }

  //     if (err.message === 'NOT_EMPTY') {
  //       return Promise.reject(new Error('Database Not Empty. Please empty the database manually.'));
  //     }

  //     return Promise.reject(err);
  //   });
};

const migrateDown = function () {
  return postgrator.migrate('0');
};

const migrateUp = function () {
  return postgrator.migrate();
};

const seed = function () {
  return postgrator.runQuery(fs.readFileSync(path.join(__dirname, '/../../seeds/seed_data.sql'), 'utf8'));
};

const createDatabase = function () {

  return confirmEmpty()
    .then(migrateDown)
    .then(migrateUp)
    .then(seed);
};

const destroyDatabase = function () {

  return migrateDown();
};

module.exports = {
  createDatabase,
  destroyDatabase,
};
