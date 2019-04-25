'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')
const authRouter = require('./auth/auth-route')
const usersRouter = require('./users/users-router')
const incomeRouter = require('./income/income-router')
const expenseRouter = require('./expense/expense-route')
const reportRouter = require('./reports/report-router')
const categoryRouter = require('./categories/category-router')
const app = express();

let morganOption = 'common';

switch (NODE_ENV) {

  case 'production':
    morganOption = 'tiny';
    break;

  case 'development':
    morganOption = 'common';
    break;

  case 'test':
    morganOption = () => {};  // none
    break;
}

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());


app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/incomes', incomeRouter)
app.use('/api/expenses', expenseRouter)
app.use('/api/reports', reportRouter)


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
