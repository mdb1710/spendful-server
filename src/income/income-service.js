

const incomeServive = {
    getAllIncomes(db, owner_id){
        return db('incomes')
            .select('*')
            .where({owner_id})
    },

    getIncomesByYear(db, year, owner_id){
        return db('incomes')
            .select('*')
            .where({owner_id})
            .andWhere(db.raw('cast(EXTRACT(Year from created_at) as integer)', '=', year))
    },

    getIncomesByYearAndMonth(db, year, month, owner_id){
        return db('incomes')
            .select('*')
            .where({owner_id})
            .andWhere(db.raw('cast(EXTRACT(YEAR from created_at) as integer)', '=', year))
            .andWhere(db.raw('cast(EXTRACT(MONTH from created_at) as integer)', '=', month))
    }
}

module.exports = incomeServive

/**
 from expenses
 where cast(EXTRACT(MONTH from created_at) as integer) = 5
   and cast(EXTRACT(YEAR from created_at) as integer) = 2019;```
 */