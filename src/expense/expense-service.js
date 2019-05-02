

const expenseService = {
  getAllExpenses(db, owner_id){
    return db('expenses')
      .select('*')
      .where({owner_id})
  },

  getExpenseById(db, id, owner_id){
    return db('expenses')
      .select('*')
      .where({id})
      .andWhere({owner_id})
      .first()
  },

  insertExpense(db, expense){
    return db
      .insert(expense)
      .into('expenses')
      .returning('*')
      .then(([expense]) => expense)
    // .then(expense => this.getExpenseById(db, expense.id, expense.owner_id))
  },

  deleteExpense(db, id){

    return db('expenses')
      .select('start_date, recurring_rule')
      .where('id', id)
      .first()
      .then((row) => {

        if (row.recurring_rule === null) {

          // Delete
          return db('expenses')
            .where({id})
            .delete();

        } else {

          // Set end date

          // FIXME
          const lastOccurrence = new Date().toISOString();

          return db('expenses')
            .where({id})
            .update('end_date', lastOccurrence);
        }
      });
  },

  updateExpense(db, updateData, id){
    return db('expenses')
      .where({id})
      .update(updateData)
      .returning('*')
      .then(([expense]) => expense);
  }
}

module.exports = expenseService;
