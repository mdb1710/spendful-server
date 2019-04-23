const express = require('express')
const userService = require('./users-service')
const path = require('path')
const usersRouter = express.Router()
const bodyParser = express.json()


usersRouter
    .post('/', bodyParser, (req, res, next) => {
        const { email, full_name, password } = req.body
        const newUser = { email, full_name, password }
        const fields = ['email', 'full_name', 'password']

        fields.forEach(field => {
            if(!req.body[field]){
                return res.status(400).json({ errors: [`Missing ${field} in request body`] })
            }
        })

        //validate password, if password invalid return status 400 with a coresponding error message
        const validateUser = userService.validateNewUser(newUser)
        if(validateUser !== null){
            const errors = validateUser.details.map(err => {
                return err.message
            })
            res.status(400).json({errors})
        }

        // check if email is taken, if so return 400 with error message
        userService
            .getUserByEmail(req.app.get('db'), newUser.email)
            .then(user => {
                if(user){
                    return res.status(400).json({errors: ['Email is already taken']})
                }

                return userService
                    .hashPassword(newUser.password)
                    .then(hashedPassword => {
                        const user = {
                            email: newUser.email,
                            full_name: newUser.full_name,
                            password: hashedPassword
                        }

                        return userService
                            .insertNewUser(req.app.get('db'), user)
                            .then(user => {
                                return res.status(201)
                                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(usersService.serializeUser(user))
                            })
                            
                    })
            })
            .catch(next)

    })


module.exports = usersRouter