const express = require('express')
const Joi = require('@hapi/joi')
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

            res.json(incomes)
            next()
        } catch(error) {
            next(error)
        }
    })
    .post(bodyParser, async (req, res, next) => {
        try{
            const { category_id, description, amount, start_date, end_date, recurring_rule} = req.body
            const fields = ['category_id', 'description', 'amount', 'start_date']
            const newIncome = {
                owner_id: req.user.id,
                category_id: Number(category_id),
                description,
                amount,
                start_date,
                end_date,
                recurring_rule
            }

            if (newIncome.recurring_rule === 'ONCE'){
                newIncome.recurring_rule = null;
            }

            for(let i=0; i<fields.length; i++){
                if(!req.body[fields[i]]){
                   return res.status(400).json({errors: [`Missing ${fields[i]} in request body`]})
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

            const schema = Joi.object({
                category_id: Joi.number(),
                description: Joi.string(),
                amount: Joi.number(),
                start_date: Joi.date(),
                end_date: Joi.date().allow(null),
                recurring_rule: Joi.alternatives().try([
                    Joi.string().regex(/\bYEARLY\b|\bMONTHLY\b|\bWEEKLY\b|\bDAILY\b/),
                    Joi.allow(null)
                ])
            })

            const validation = Joi.validate(req.body, schema)

            if (validation.error) {
                const errorStrings = validation.error.details.map(err => {
                    return err.message;
                })
                return res.status(400).json({ errors: errorStrings });
            }

            await incomeService
                .updateIncome(
                    req.app.get('db'),
                    validation.value,
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
            return res.status(404).json({errors: [`Income doesn't exist`]})
        }

        const income = await incomeService
            .getIncomeById(
                req.app.get('db'),
                req.params.id,
                req.user.id
            )
        if(!income){
            return res
                .status(404)
                .json({errors: [`Income doesn't exist`]})
        }

        res.income = income
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = incomeRouter
