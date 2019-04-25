const { JsonWebTokenError } = require('jsonwebtoken')
const AuthService = require('../auth/auth-service')

async function requireAuth(req, res, next){
    const authToken = req.get('Authorization') || ''
    let bearerToken;
    
    if(!authToken.toLowerCase().startsWith('bearer ')){
        return res.status(401).json({ errors: ['Missing bearer token'] })
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }

    try {
        const payload = AuthService.verifyJwt(bearerToken);
       
        const user = await AuthService.getUserbyUserId(req.app.get('db'), payload.user_id)
        
        if(!user){
            return res.status(401).json({ errors: ['Unauthorized request']})              
        }

        req.user = user
        next()
           
    } catch (error){
        if(error instanceof JsonWebTokenError){
           return res.status(401).json({ errors: ['Unauthorized request']})
        }

        next(error)
    }
}

module.exports = { requireAuth }