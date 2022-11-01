/*
http://localhost:3000
http://localhost:3000/formanaAuth/register
http://localhost:3000/formanaAuth/login
http://localhost:3000/formanaAuth/logout
http://localhost:3000/formanaAuth/refresh-token
*/


const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../Models/User.model')
const {authSchema} = require('../helpers/Validation')

// define the routes

// REGISTER USERS
router.post('/register', async (req, res, next) => {
    //console.log(req.body)
    try {
        //const {name,email,password,srcode}  = req.body
        //if (!name || !email || !password || !srcode) throw createError.BadRequest()
        
        // validating req.body using authSchema (Joi)
        const result = await authSchema.validateAsync(req.body)

        const emailExist = await User.findOne({email: result.email})
        if (emailExist) 
            throw createError.Conflict(result.email + ' already exists')
    
        // if email doesn't exist, add another user
        const user = new User(result)
        const savedUser = await user.save()

        res.send(savedUser)
    } catch (error){
        // if error is comming from Joi
        if (error.isJoi === true) error.status = 422    // 422 Unprocessable Entity
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    res.send('login route')
})

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh-token route')
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})



module.exports = router
