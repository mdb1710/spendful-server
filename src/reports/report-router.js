
const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const reportService = require('./report-service')

const reportRouter = express.Router()

reportRouter
    .get('/:year', requireAuth, async (req, res, next) => {
        try{
            const year = req.params.year
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

            if(incomesForYear.length === 0){
                return res.status(404).json({
                    errors: [`No incomes exist in the year`],
                })
            }

            if(expensesForYear.length === 0){
                return res.status(404).json({
                    errors: [`No incomes exist in the year`],
                })
            }

            res.json({
                incomes: incomesForYear,
                expenses: expensesForYear
            })
            next()
        }catch(error){
            next(error)
        }
    })

reportRouter
    .get('/:year/:month', requireAuth, async(req, res, next) =>{

        try{
            const { month, year }= req.params

            const incomesForMonth = await reportService
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