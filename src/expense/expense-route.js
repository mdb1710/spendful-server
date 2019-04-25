const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const expenseService = require('./expense-service')

const expenseRouter = express.Router()
const bodyParser = express.json()

expenseRouter
    .route('/')
    .all(requireAuth)
    .get(async(req, res, next) => {
        try{
            const expenses = await expenseService
                .getAllExpenses(req.app.get('db'), req.user.id)

            if(expenses.length === 0){
                return res.status(404).json({
                    errors: [`No expenses found`],
                })
            }

            res.json(expenses)
            next()
        } catch(error) {
            next(error)
        }
    })
    .post(bodyParser, async (req, res, next) => {
        try{
            const { category_id, description, amount, recurring_rule} = req.body
            const fields = ['category_id', 'description', 'amount']
            const newExpense = {
                category_id: Number(category_id),
                description,
                amount,
                recurring_rule
            }

            for(let i=0; i<fields.length; i++){
                if(!req.body[fields[i]]){
                   return res.status(400).json({errors: [`Missing ${fields[i]} in request body`]})
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
            const updatedExpense = await expenseService
                .updateExpense(
                    req.app.get('db'),
                    req.body,
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
        const expense = await expenseService
            .getExpenseById(
                req.app.get('db'),
                req.params.id,
                req.user.id
            )
        // console.log(income)
        if(!expense){
            return res
                .status(400)
                .json({errors: [`Expense doesn't exist`]})
        }
        res.expense = expense
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = expenseRouter
