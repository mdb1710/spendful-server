const jwt = require()
const config = require('../config')
const bcrypt =  require('bcryptjs')


const AuthService = {
    getUserbyUserEmail(db, email){
        return db('users')
            .where({email})
            .first()
    },

    getUserbyUserId(db, id){
        return db('users')
            .where({id})
            .first()
    },    

    comparePassword(password, hash){
        return bcrypt.compare(password, hash)
    },

    verifyJwt(token){
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256']
        })
    },

    createJwt(payload){
        return jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY,
            algorithm: 'HS256'
        })
    }
}

module.exports = AuthService