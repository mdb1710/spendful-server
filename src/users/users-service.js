const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const xss = require('xss')

const userService = {
    validateNewUser(newUser){
        const schema = Joi.object({
            email: Joi.string().email().required(),
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
            email: xss(user.email),
            full_name: xss(user.full_name)
        }
    },

    getUserbyEmail(db, email){
        return db('users')
            .where({email})
            .first()
            .then(user => !!user)
    },

    insertNewUser(db, newUser){
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    }
}


module.exports = userService