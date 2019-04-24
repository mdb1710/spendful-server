const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const incomeService = require('./income-service')

const incomeRouter = express.Router()
const bodyParser = express.json()

incomeRouter
    .get('/', requireAuth, async(req, res, next) => {
        try{
            const incomes = await incomeService
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

            const income = await incomeService
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
    .get('/:id', requireAuth, async(req, res, next) => {
        try{
            const incomeId = req.params.id

            const income = await incomeService
                .getIncomeById(
                    req.app.get('db'),
                    incomeId
                )
            
            if(!income){
                return res.status(400).json({errors: [`Income doesn't exist`]})
            }

            res.json(income)
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