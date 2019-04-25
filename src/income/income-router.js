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
            const fields = ['category_id', 'description', 'amount']
            const newIncome = {
                category_id: Number(category_id), 
                description, 
                amount,
                recurring_rule
            }

            for(let i=0; i<fields.length; i++){
                if(!req.body[fields[i]]){
                   return res.status(400).json({errors: [`Missing ${field[i]} in request body`]})
                }
            }

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
        
            res.status(204).end()
            next()  
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
                req.params.id,
                req.user.id
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
 
