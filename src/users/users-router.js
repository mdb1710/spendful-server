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

        
        res.status(501)
    })


module.exports = usersRouter