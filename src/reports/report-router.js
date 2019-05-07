
const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const reportService = require('./report-service')
const xss = require('xss')

const reportRouter = express.Router()

reportRouter
    .get('/:year', requireAuth, async (req, res, next) => {
        try{
            const year = req.params.year

            if(isNaN(parseInt(year, 10))){
                return res.status(404).json({errors: ['Invalid year']})
            }
            const incomesForYear = await reportService
                .getIncomesByYear(
                    req.app.get('db'),
                    Number(year),
                    req.user.id
                )

            const cleanIncomes = incomesForYear.map(i => {

                i.description    = xss(i.description);
                i.recurring_rule = xss(i.recurring_rule);
                return i;
            });

            const expensesForYear = await reportService
                .getExpensesByYear(
                    req.app.get('db'),
                    Number(year),
                    req.user.id
                )

                const cleanExpenses = expensesForYear.map(e => {

                    e.description    = xss(e.description);
                    e.recurring_rule = xss(e.recurring_rule);
                    return e;
                });

            res.json({
                incomes: cleanIncomes,
                expenses: cleanExpenses,
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
            return res.status(404).json({errors: ['Invalid year or month']})
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
                incomes: incomesForMonth,
                expenses: expensesForMonth
            })
            next()
        }catch(error){
            next(error)
        }
    })


// function recurring(data){
//     const regexs = /\bYEARLY\b|\bMONTHLY\b|\bWEEKLY\b|\bDAILY\b/i
//     data.forEach(item => {
//         if(item.recurring_rule !== null){
//             const matches = regexs.exec(item.recurring_rule);
//             if (matches) {
//                 item.recurring_rule = matches[0];
//             }
//         }
//     })
//     return data
// }

module.exports = reportRouter
