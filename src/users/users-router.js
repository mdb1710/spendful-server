const express = require('express')
const userService = require('./users-service')
const path = require('path')
const usersRouter = express.Router()
const bodyParser = express.json()


usersRouter
    .post('/', bodyParser, async (req, res, next) => {
        const { email, full_name, password } = req.body
        const newUser = { email, full_name, password }
        const fields = ['email', 'full_name', 'password']

        fields.forEach(field => {
            if(!req.body[field]){
                return res.status(400).json({ errors: [`Missing ${field} in request body`] })
            }
        })

        try{
            const validateUser = await userService.validateNewUser(newUser)
            if(validateUser !== null){
                const errors = validateUser.details.map(err => {
                    return err.message
                })
                res.status(400).json({errors})
            }
    
            const hasUserWithEmail = await userService.getUserByEmail(req.app.get('db'), newUser.email)
        
            if(hasUserWithEmail){
                return res.status(400).json({errors: ['Email is already taken']})
            }
    
            const hashedPassword = await userService
                        .hashPassword(newUser.password)
                        
            const userToInsert = {
                email: newUser.email,
                full_name: newUser.full_name,
                password: hashedPassword
            }
    
            const user =  await userService
                        .insertNewUser(req.app.get('db'), userToInsert)
                                
            res.status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(usersService.serializeUser(user))

        } catch(error) {
            next(error)
        }

    })


module.exports = usersRouter