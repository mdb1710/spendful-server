

const reportService = {
    getIncomesByYear(db, year, owner_id){
        return db('incomes')
            .select('*')
            .where({owner_id})
            .andWhere(db.raw('cast(EXTRACT(Year from created_at) as integer)'), year)
    },
    
    getIncomesByYearAndMonth(db, year, month, owner_id){
        return db('incomes')
            .select('*')
            .where({owner_id})
            .andWhere(db.raw('cast(EXTRACT(YEAR from created_at) as integer)'), year)
            .andWhere(db.raw('cast(EXTRACT(MONTH from created_at) as integer)'), month)
    },

    getExpensesByYear(db, year, owner_id){
        return db('expenses')
            .select('*')
            .where({owner_id})
            .andWhere(db.raw('cast(EXTRACT(Year from created_at) as integer)'), year)
    },
    
    getExpensesByYearAndMonth(db, year, month, owner_id){
        return db('expenses')
            .select('*')
            .where({owner_id})
            .andWhere(db.raw('cast(EXTRACT(YEAR from created_at) as integer)'), year)
            .andWhere(db.raw('cast(EXTRACT(MONTH from created_at) as integer)'), month)
    },

}

module.exports = reportService