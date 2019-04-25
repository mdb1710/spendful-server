
const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const reportService = require('./report-service')

const reportRouter = express.Router()

reportRouter
    .get('/:year', requireAuth, async (req, res, next) => {
        try{
            const year = req.params.year

            if(isNaN(parseInt(year, 10))){
                return res.status(404).json({errors: ['Not a number']})
            }
            const incomesForYear = await reportService
                .getIncomesByYear(
                    req.app.get('db'),
                    Number(year),
                    req.user.id
                )

            const expensesForYear = await reportService
                .getExpensesByYear(
                    req.app.get('db'),
                    Number(year),
                    req.user.id
                )

            res.json({
                incomes: recurring(incomesForYear),
                expenses: recurring(expensesForYear)
            })
            next()
        }catch(error){
            next(error)
        }
    })

reportRouter
    .get('/:year/:month', requireAuth, async(req, res, next) =>{
        const { month, year }= req.params

        if(isNaN(parseInt(year, 10)) || isNaN(parseInt(month, 10))){
            return res.status(404).json({errors: ['Not a number']})
        }

        try{

            const incomesForMonth = await reportService
                .getIncomesByYearAndMonth(
                    req.app.get('db'),
                    Number(year),
                    Number(month),
                    req.user.id
                )

            const expensesForMonth = await reportService
                .getExpensesByYearAndMonth(
                    req.app.get('db'),
                    Number(year),
                    Number(month),
                    req.user.id
                )


            res.json({
                incomes: recurring(incomesForMonth),
                expenses: recurring(expensesForMonth)
            })
            next()
        }catch(error){
            next(error)
        }
    })


function recurring(data){
    const regexs = /\bYEARLY\b|\bMONTHLY\b|\bWEEKLY\b|\bDAILY\b/
    data.forEach(item => {
        if(item.recurring_rule !== null){
            const matches = regexs.exec(item.recurring_rule);
            if (matches) {
                item.recurring_rule = matches[0];
            }
        }
    })
    return data
}

module.exports = reportRouter
