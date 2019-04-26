

const categoryService = {
    getAllCategoriesByUserId(db, owner_id){
        return db('categories')
            .select('*')
            .where({owner_id})
    },

    getCategoryById(db, id, owner_id){
        return db('categories')
            .select('*')
            .where({id})
            .andWhere({owner_id})
            .first()
    },

    insertCategory(db, newCategory){
        return db
            .insert(newCategory)
            .into('categories')
            .returning('*')
            .then(([category]) => category)
            .then(category => this.getCategoryById(db, category.id, category.owner_id))
    },

    deleteCategory(db, id){
        return db('categories')
            .where({id})
            .delete()
    },

    updateCategory(db, updateData, id){
        return db('categories')
            .where({id})
            .update(updateData)
            .returning('*')
            .then(([category]) => !!category)
    },

    getIncomesByCategoryId(db, category_id, owner_id){
        return db('incomes')
            .select('*')
            .where({category_id})
            .andWhere({owner_id})
            .then(incomes => !!incomes)
    },

    getExpensesByCategoryId(db, category_id, owner_id){
        return db('expenses')
        .select('*')
        .where({category_id})
        .andWhere({owner_id})
        .then(expenses => !!expenses)
    }

}

module.exports = categoryService