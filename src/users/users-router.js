const express = require('express')


const usersRouter = express.Router()
const bodyParser = express.json()


usersRouter
    .post('/', bodyParser, (req, res, next) => {
        const { email, full_name, password } = req.body
        const fields = ['email', 'full_name', 'password']

        fields.forEach(field => {
            if(!req.body[field]){
                return res.status(400).json({ error: `Missing ${field} in request body` })
            }
        })

        //validate password, if password invalid return status 400 with a coresponding error message

        // check if email is taken, if so return 400 with error message

        //else, hash the password and insert user to user table
          // then return serialized user info 




        res.status(501)
    })


module.exports = usersRouter