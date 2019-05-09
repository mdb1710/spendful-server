const express = require('express')
const Joi = require('@hapi/joi')
const { requireAuth } = require('../middleware/jwt-auth')
const expenseService = require('./expense-service')
const xss = require('xss')

const expenseRouter = express.Router()
const bodyParser = express.json()

expenseRouter
    .route('/')
    .all(requireAuth)
    .get(async(req, res, next) => {
        try{
            const expenses = await expenseService
                .getAllExpenses(req.app.get('db'), req.user.id)

            const clean = expenses.map(e => {

                e.description    = xss(e.description);
                e.recurring_rule = xss(e.recurring_rule);
                return e;
            });

            res.json(clean)
            next()
        } catch(error) {
            next(error)
        }
    })
    .post(bodyParser, async (req, res, next) => {
        try{
            const { category_id, description, amount, start_date, end_date, recurring_rule} = req.body
            const fields = ['category_id', 'description', 'amount', 'start_date']
            const newExpense = {
                category_id: Number(category_id),
                description,
                amount,
                start_date,
                end_date,
                recurring_rule
            }

            if (/once/i.test(newExpense.recurring_rule)){

                newExpense.recurring_rule = null;
            }

            // end_date cannot be before start date, but it can be null
            if (newExpense.end_date && new Date(newExpense.end_date) < new Date(newExpense.start_date)) {
                return res.status(400).json({ errors: ['end date cannot be earlier than start date'] });
            }

            for(let i=0; i<fields.length; i++){
                if(!req.body[fields[i]]){
                   return res.status(400).json({errors: [`${fields[i]} is required`]})
                }
            }

            newExpense.owner_id = req.user.id

            const expense = await expenseService
                .insertExpense(
                    req.app.get('db'),
                    newExpense
                )

            res.status(201).json(expense)
            next()
        } catch(error){
            next(error)
        }
    })

expenseRouter
    .route('/:id')
    .all(requireAuth)
    .all(isExpenseExist)
    .get(async(req, res, next) => {
        try{
            res.expense.description    = xss(res.expense.description);
            res.expense.recurring_rule = xss(res.expense.recurring_rule);

            res.json(res.expense)
            next()
        }catch(error){
            next(error)
        }
    })
    .delete(async(req, res, next) => {
        try{
            await expenseService
                .deleteExpense(
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
                category_id: Joi.number().label('category'),
                description: Joi.string(),
                amount: Joi.number(),
                start_date: Joi.date(),
                end_date: Joi.date().min(Joi.ref('start_date')).allow(null).error(
                    () => { return 'end date cannot be earlier than start date'; },
                    { self: true }
                ),
                recurring_rule: Joi.alternatives().try([
                    Joi.string().regex(/\bYEARLY\b|\bMONTHLY\b|\bWEEKLY\b|\bBIWEEKLY\b/),
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

            const updatedExpense = await expenseService
                .updateExpense(
                    req.app.get('db'),
                    validation.value,
                    req.params.id
                )

            res.status(204).json(updatedExpense)
            next()
        } catch(error){
            next(error)
        }
    })


async function isExpenseExist(req, res, next){
    try{

        if(isNaN(parseInt(req.params.id, 10))){
            return res.status(404).json({errors: [`Expense doesn't exist`]})
        }
        const expense = await expenseService
            .getExpenseById(
                req.app.get('db'),
                req.params.id,
                req.user.id
            )

        if(!expense){
            return res
                .status(404)
                .json({errors: [`Expense doesn't exist`]})
        }
        res.expense = expense
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = expenseRouter
