const express = require('express')
const AuthService = require('./auth-service')
const requireAuth = require('../middleware/jwt-auth')
const authRouter = express.Router()
const bodyParser = express.json()

authRouter
    .post('/login', bodyParser, (req, res, next) => {
        const { email, password } = req.body
        const loginUser = { email, password }
        for(const [key, value] of Object.entries(loginUser)){
            if(value === null){
                return res.status(400).json({error: `Missing ${key} in request body`})
            }
        }

        AuthService
            .getUserbyUserEmail(req.app.get('db'), loginUser.email)
            .then(user => {
                if(!user){
                    return res.status(400).json({error: 'Incorrect email or password'})
                }

                return AuthService
                    .comparePassword(loginUser.password, user.password)
                    .then(comparePasswords => {
                        if(!comparePasswords){
                            return res.status(400).json({error: 'Incorrect email or password'})
                        }

                        const payload = {
                            user_id: req.user.id,
                            full_name: req.user.full_name
                        }

                        res.send({
                            authToken: AuthService.createJwt(payload)
                        })
                    })
            })
            .catch(next)
    })

authRouter
    .post('/refresh', requireAuth, (req, res, next) => {
        const payload = {
            user_id: req.user.id,
            full_name: req.user.full_name
        }
        res.send({
            authToken: AuthService.createJwt(payload)
        })
        next()
    })


module.express = authRouter