const express = require('express')
const userService = require('./users-service')
const path = require('path')
const usersRouter = express.Router()
const bodyParser = express.json()


usersRouter
    .post('/', bodyParser, async (req, res, next) => {
        const { email_address, full_name, password } = req.body
        const newUser = { email_address, full_name, password }
        const fields = ['email_address', 'full_name', 'password']

        for(let i=0; i<fields.length; i++){
            if(!req.body[fields[i]]){
                return res.status(400).json({ errors: [`Missing ${fields[i]} in request body`] })
            }
        }

        try{
            const validateUser = await userService.validateNewUser(newUser)
            if(validateUser !== null){
                const errors = validateUser.details.map(err => {
                    return err.message
                })
                res.status(400).json({errors})
            }

            const hasUserWithEmail = await userService.getUserbyEmail(req.app.get('db'), newUser.email_address)

            if(hasUserWithEmail){
                return res.status(400).json({errors: ['Email is already taken']})
            }

            const hashedPassword = await userService
                        .hashPassword(newUser.password)

            const userToInsert = {
                email_address: newUser.email_address,
                full_name: newUser.full_name,
                password_hash: hashedPassword
            }

            const user =  await userService
                        .insertNewUser(req.app.get('db'), userToInsert)

            res.status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(userService.serializeUser(user))

        } catch(error) {
            next(error)
        }

    })


module.exports = usersRouter
