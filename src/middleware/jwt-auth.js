
const AuthService = require('../auth/auth-service')

function requireAuth(req, res, next){
    const authToken = req.get('Authorization') || '';
    let bearerToken;

    if(!authToken.toLowerCase().startsWith('bearer ')){
        return res.status(401).json({ errors: ['Missing bearer token'] });
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }

    try {
        const payload = AuthService.verifyJwt(bearerToken);

        AuthService
            .getUserbyUserId(req.app.get('db'), payload.user_id)
            .then(user => {
                if(!user){
                    return res.status(401).json({ errors: ['Unauthorized request'] });              
                }
                req.user = user
                next()
            })
            .catch(error => {
                next(error)
            })
    } catch (error){
        res.status(401).json({ errors: ['Unauthorized request']})
    }
}

module.exports = { requireAuth }