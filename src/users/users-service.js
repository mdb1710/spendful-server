const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const xss = require('xss')

const userService = {
    validateNewUser(newUser){
        const schema = Joi.object({
            email_address: Joi.string().email().required(),
            full_name: Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
        })

        const response = Joi.validate(newUser, schema, {abortEarly: false})
        if(response.error){
            return response.error;
        }

        return null
    },

    hashPassword(password){
        return bcrypt.hash(password, 12)
    },

    serializeUser(user){
        return {
            email_address: xss(user.email_addressl),
            full_name: xss(user.full_name),
            created_at: user.created_at,
            updated_at: user.updated_a
        }
    },

    getUserbyEmail(db, email_address){
        return db('users')
            .where({email_address})
            .first()
            .then(user => !!user)
    },

    insertNewUser(db, newUser){
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user]) => user)
            .then((user) => {

                const defaultCategories = [
                    { owner_id: user.id, name: 'Cash', type: 'income' },
                    { owner_id: user.id, name: 'Check', type: 'income' },
                    { owner_id: user.id, name: 'Direct Deposit', type: 'income' },
                    { owner_id: user.id, name: 'Housing', type: 'expense' },
                    { owner_id: user.id, name: 'Transportation', type: 'expense' },
                    { owner_id: user.id, name: 'Food', type: 'expense' },
                    { owner_id: user.id, name: 'Utilities', type: 'expense' },
                    { owner_id: user.id, name: 'Entertainment', type: 'expense' },
                ];

                return db
                    .insert(defaultCategories)
                    .into('categories')
                    .then(() => user);
            })
    }
}


module.exports = userService
