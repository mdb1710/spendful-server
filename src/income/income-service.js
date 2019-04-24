

const incomeService = {
    getAllIncomes(db, owner_id){
        return db('incomes')
            .select('*')
            .where({owner_id})
    },

    getIncomeById(db, id){
        return db('incomes')
            .select('*')
            .where({id})
            .first()
    },

    insertIncome(db, income){
        return db
            .insert(income)
            .into('incomes')
            .returning('*')
            .then(([income]) => income)
            .then(income => this.getIncomeById(db, income.id))
    }
}

module.exports = incomeService

/**
 from expenses
 where cast(EXTRACT(MONTH from created_at) as integer) = 5
   and cast(EXTRACT(YEAR from created_at) as integer) = 2019;```
 */