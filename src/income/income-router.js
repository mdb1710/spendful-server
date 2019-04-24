const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const incomeServive = require('./income-service')

const incomeRouter = express.Router()
const bodyParser = express.json()

incomeRouter
    .get('/', requireAuth, async(req, res, next) => {
        try{
            const incomes = await incomeServive
                .getAllIncomes(req.app.get('db'), req.user.id)

            if(incomes.length === 0){
                return res.status(404).json({
                    errors: [`No incomes found`],
                })
            }

            res.json(incomes)
            next()
        } catch(error) {
            next(error)
        }
    })
    .post('/', bodyParser, async (req, res, next) => {
        try{
            const { category_id, description, amount, recurring_rule} = req.body
            const fields = ['description', 'amount']
            const newIncome = {
                category_id: Number(category_id), 
                description, 
                amount,
                recurring_rule
            }

            fields.forEach(field => {
                if(!req.body[field]){
                   return res.status(400).json({errors: [`Missing ${field} in request body`]})
                }
            })

            newIncome[owner_id] = req.user.id

            const income = await incomeServive
                .insertIncome(
                    req.app.get('db'),
                    newIncome
                )

            res.json(income)
            next()
        } catch(error){
            next(error)
        }
    })

incomeRouter
    .get('/:year', requireAuth, async (req, res, next) => {
        try{
            const year = req.params.year
            const incomesForYear = await incomeServive
                .getIncomesByYear(
                    req.app.get('db'),
                    Number(year), 
                    req.user.id
                )

            if(incomesForYear.length === 0){
                return res.status(404).json({
                    errors: [`No incomes exist in the year`],
                })
            }

            res.json(incomesForYear)
            next()
        }catch(error){
            next(error)
        }
    })

incomeRouter
    .get('/:year/:month', requireAuth, async(req, res, next) =>{

        try{
            const { month, year }= req.params

            const incomesForMonth = await incomeServive
                .getIncomesByYearAndMonth(
                    req.app.get('db'),
                    Number(year),
                    Number(month),
                    req.user.id
                )
            
            if(incomesForMonth.length === 0){
                return res.status(404).json({
                    errors: [`No incomes exist for the Month`],
                })
            }

            res.json(incomesForMonth)
            next()
        }catch(error){
            next(error)
        }
    })


module.exports = incomeRouter
 
/*
RESTful

example car object
  make: Honda
  model: Civic

every endpoint responds with one of
  - car object
  - array of car objects
  - empty

---

GET /cars
  get array of car objects

POST /cars
  create a new car object

  example request body
    make: Toyota
    model: Corolla

GET /car/:id
  get car object with matching :id

PATCH /car/:id
  update car object matching :id with info from body

  example request body
    model: Camry

DELETE /car/:id

  delete car object matching :id
  */