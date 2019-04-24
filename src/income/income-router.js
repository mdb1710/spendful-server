const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const incomeService = require('./income-service')

const incomeRouter = express.Router()
const bodyParser = express.json()

incomeRouter
    .route('/')
    .all(requireAuth)
    .get(async(req, res, next) => {
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
    .post(bodyParser, async (req, res, next) => {
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
    .route('/:id')
    .all(requireAuth)
    .all(isIncomeExist)
    .get(async(req, res, next) => {
        try{
            res.json(res.income)
            next()
        }catch(error){
            next(error)
        }
    })
    .delete(async(req, res, next) => {
        try{
            await incomeService
                .deleteIncome(
                    req.app.get('db'),
                    req.params.id
                )
                .then(res => {
                    res.status(204).end()  
                })
        } catch(error){
            next(error)
        }
    })
    .patch(bodyParser, async(req, res, next) => {
        try{ 
            const updatedIncome = await incomeService
                .updateIncome(
                    req.app.get('db'), 
                    req.body, 
                    req.params.id
                )
          
            res.json(updatedIncome)
            res.status(501)
            next()
        } catch(error){
            next(error)
        }
    })


async function isIncomeExist(req, res, next){
    try{
        const income = await incomeService
            .getIncomeById(
                req.app.get('db'),
                req.params.id
            )
        // console.log(income)
        if(!income){
            return res
                .status(400)
                .json({errors: [`Income doesn't exist`]})
        }
        res.income = income
        next()
    } catch (error) {
        next(error)
    }
}



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