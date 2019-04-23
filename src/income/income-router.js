const express = require('express')
const requireAuth = require('../middleware/jwt-auth')
const incomeServive = require('./income-service')
const incomeRouter = express.Router()
const bodyParser = express.json()


incomeRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const income = await incomeServive
        .getIncomes(req.app.get('db'), req.user.id)

      if(!income){
          return res.status(404).json({
            error: [`You don't have any incomes yet`],
          })
      }

      req.income = income
      next()
    } catch (error) {
      next(error)
    }
  })

incomeRouter
    get('/', (req, res, next) => {
        const {} = req.body

        res.status(501)
    })
    .post('/', bodyParser, (req, res, next) => {
        res.status(501)
    })