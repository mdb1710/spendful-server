







// incomeRouter
// .get('/:year', requireAuth, async (req, res, next) => {
//     try{
//         const year = req.params.year
//         const incomesForYear = await incomeServive
//             .getIncomesByYear(
//                 req.app.get('db'),
//                 Number(year), 
//                 req.user.id
//             )

//         if(incomesForYear.length === 0){
//             return res.status(404).json({
//                 errors: [`No incomes exist in the year`],
//             })
//         }

//         res.json(incomesForYear)
//         next()
//     }catch(error){
//         next(error)
//     }
// })

// incomeRouter
// .get('/:year/:month', requireAuth, async(req, res, next) =>{

//     try{
//         const { month, year }= req.params

//         const incomesForMonth = await incomeServive
//             .getIncomesByYearAndMonth(
//                 req.app.get('db'),
//                 Number(year),
//                 Number(month),
//                 req.user.id
//             )
        
//         if(incomesForMonth.length === 0){
//             return res.status(404).json({
//                 errors: [`No incomes exist for the Month`],
//             })
//         }

//         res.json(incomesForMonth)
//         next()
//     }catch(error){
//         next(error)
//     }
// })