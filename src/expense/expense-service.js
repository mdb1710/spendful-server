'use strict';

const expenseService = {
  getAllExpenses(db, owner_id){
    return db('expenses')
      .select('*')
      .where({owner_id})
      .orderBy([{column: 'start_date', order: 'desc'}, {column: 'description', order: 'asc'}]);
  },

  getExpenseById(db, id, owner_id){
    return db('expenses')
      .select('*')
      .where({id})
      .andWhere({owner_id})
      .first();
  },

  insertExpense(db, expense){
    return db
      .insert(expense)
      .into('expenses')
      .returning('*')
      .then(([expense]) => expense);
    // .then(expense => this.getExpenseById(db, expense.id, expense.owner_id))
  },

  deleteExpense(db, id){
    return db('expenses')
      .where({id})
      .delete();
  },

  updateExpense(db, updateData, id){
    return db('expenses')
      .where({id})
      .update(updateData)
      .returning('*')
      .then(([expense]) => expense);
  }
};

module.exports = expenseService;
