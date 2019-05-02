

const incomeService = {
  getAllIncomes(db, owner_id){
    return db('incomes')
      .select('*')
      .where({owner_id})
  },

  getIncomeById(db, id, owner_id){
    return db('incomes')
      .select('*')
      .where({id})
      .andWhere({owner_id})
      .first()
    // .then(res => console.log(res))
  },

  insertIncome(db, income){
    return db
      .insert(income)
      .into('incomes')
      .returning('*')
      .then(([income]) => income)
    // .then(income => this.getIncomeById(db, income.id, income.owner_id))
  },

  deleteIncome(db, id){

    return db('incomes')
      .select('start_date, recurring_rule')
      .where('id', id)
      .first()
      .then((row) => {

        if (row.recurring_rule === null) {

          // Delete
          return db('incomes')
            .where({id})
            .delete();

        } else {

          // Set end date

          // FIXME
          const lastOccurrence = new Date().toISOString();

          return db('incomes')
            .where({id})
            .update('end_date', lastOccurrence);
        }
      });
  },

  updateIncome(db, updateData, id){
    return db('incomes')
      .where({id})
      .update(updateData)
      .returning('*')
      .then(([income]) => income);
  }
}

module.exports = incomeService;

/**
 from expenses
 where cast(EXTRACT(MONTH from created_at) as integer) = 5
   and cast(EXTRACT(YEAR from created_at) as integer) = 2019;```
 */
