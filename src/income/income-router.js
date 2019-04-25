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

            if(!incomes){
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
            const { category_id, description, amount, start_date, recurring_rule} = req.body
            const fields = ['category_id', 'description', 'amount', 'start_date']
            const newIncome = {
                owner_id: req.user.id,
                category_id: Number(category_id),
                description,
                amount,
                start_date,
                recurring_rule
            }

            for(let i=0; i<fields.length; i++){
                if(!req.body[fields[i]]){
                   return res.status(400).json({errors: [`Missing ${req.body[fields[i]]} in request body`]})
                }
            }

            const income = await incomeService
                .insertIncome(
                    req.app.get('db'),
                    newIncome
                )

            res.status(201).json(income)
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
            // console.log(res.income)
            if (!res.income) {
                return res.status(404).json({ errors: ['income not found'] });
            }
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
            await incomeService
                .updateIncome(
                    req.app.get('db'),
                    req.body,
                    req.params.id
                )

            res.status(204).end()
            // res.status(204).json(updatedIncome)
            next()
        } catch(error){
            next(error)
        }
    })


async function isIncomeExist(req, res, next){
    try{
        if(isNaN(parseInt(req.params.id, 10))){
            return res.status(404).json({errors: ['Not a number']})
        }

        const income = await incomeService
            .getIncomeById(
                req.app.get('db'),
                req.params.id,
                req.user.id
            )

        res.income = income
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = incomeRouter
