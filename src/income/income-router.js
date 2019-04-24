const express = require('express')
const requireAuth = require('../middleware/jwt-auth')
const incomeServive = require('./income-service')
const incomeRouter = express.Router()
const bodyParser = express.json()


// incomeRouter
//   .use(requireAuth)
//   .use(async (req, res, next) => {
//     try {
//       const incomes = await incomeServive
//         .getIncomes(req.app.get('db'), req.user.id)

//       if(!incomes){
//           return res.status(404).json({
//             errors: [`You don't have any incomes yet`],
//           })
//       }

//       req.incomes = incomes
//       next()
//     } catch (error) {
//       next(error)
//     }
//   })

incomeRouter
    get('/', requireAuth, async(req, res, next) => {
        try{
            const incomes = await incomeServive
                .getAllIncomes(req.app.get('db'), req.user.id)

            if(incomes.length === 0){
                return res.status(404).json({
                    errors: [`No incomes found`],
                })
            }

            const totalIncome = incomes.reduce((total, current) => {
                return total+=current.amount
            }, 0)

            res.json({
                total: totalIncome,
                incomesAll: incomes
            })
            next()
        } catch(error) {
            next(error)
        }
    })
    .post('/', bodyParser, async (req, res, next) => {
        try{
            const { description, amount, recurring_rule} = req.body
            const fields = ['description', 'amount']
            const newIncome = { 
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

            const income = await incomeServive
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
    .get('/:year', requireAuth, async (req, res, next) => {
        try{
            const year = req.params.year
            const incomesForYear = await incomeServive
                .getIncomesByYear(
                    req.app.get('db'),
                    Number(year), 
                    req.user.id
                )

            if(incomesForYear.length === 0){
                return res.status(404).json({
                    errors: [`No incomes exist in the year`],
                })
            }

            const totalIncome = incomesForYear.reduce((total, current) => {
                return total+=current.amount
            }, 0)

            res.json({
                year,
                incomes: incomesForYear,
                total: totalIncome 
            })

            next()
        }catch(error){
            next(error)
        }
    })

incomeRouter
    .get('/:year/:month', requireAuth, (req, res, next) =>{

        try{
            const year = req.params.year
            const month = req.params.month

            const incomesForMonth = await incomeServive
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
            const totalIncome = incomesForMonth.reduce((total, current) => {
                return total+=current.amount
            }, 0)

            res.json({
                year,
                month,
                incomes: incomesForMonth,
                total: totalIncome
            })
            next()
        }catch(error){
            next(error)
        }
    })


module.exports = incomeRouter
 