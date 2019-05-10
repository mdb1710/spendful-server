'use strict';

const incomeService = {
  getAllIncomes(db, owner_id){
    return db('incomes')
      .select('*')
      .where({owner_id})
      .orderBy([{column: 'start_date', order: 'desc'}, {column: 'description', order: 'asc'}]);
  },

  getIncomeById(db, id, owner_id){
    return db('incomes')
      .select('*')
      .where({id})
      .andWhere({owner_id})
      .first();
  },

  insertIncome(db, income){
    return db
      .insert(income)
      .into('incomes')
      .returning('*')
      .then(([income]) => income);
    // .then(income => this.getIncomeById(db, income.id, income.owner_id))
  },

  deleteIncome(db, id){
    return db('incomes')
      .where({id})
      .delete();
  },

  updateIncome(db, updateData, id){
    return db('incomes')
      .where({id})
      .update(updateData)
      .returning('*')
      .then(([income]) => income);
  }
};

module.exports = incomeService;

/**
 from expenses
 where cast(EXTRACT(MONTH from created_at) as integer) = 5
   and cast(EXTRACT(YEAR from created_at) as integer) = 2019;```
 */
