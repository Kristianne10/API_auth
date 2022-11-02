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
//const {authSchema, loginSchema} = require('../helpers/Validation');
const {authSchema} = require('../helpers/Validation');
const {signAccessToken} = require('../helpers/jwt')

// define the routes

// REGISTER USERS
router.post('/register', async (req, res, next) => {
    //console.log(req.body)
    try {
        //const {email,password}  = req.body
        //if (!email || !password) throw createError.BadRequest()
        
        // validating req.body using authSchema (Joi)
        const result = await authSchema.validateAsync(req.body)

        const emailExist = await User.findOne({email: result.email})
        if (emailExist) 
            throw createError.Conflict(result.email + ' already exists')
    
        // if email doesn't exist, add another user
        const user = new User(result)
        const savedUser = await user.save()

        const accessToken = await signAccessToken(savedUser.id)
        res.send({accessToken})

        //res.send(savedUser)
    } catch (error){
        // if error is comming from Joi
        if (error.isJoi === true) error.status = 422    // 422 Unprocessable Entity
        next(error)

    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
                // find user inside users(Collection)
        const user = await User.findOne({email: result.email})
        if (!user) throw createError.NotFound("Your credentials did not match are record.")
        
        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createError.Unauthorized('Please ensure that your credentials are valid.')

        const accessToken = await signAccessToken(user.id)
        res.send({ accessToken })
        //res.send(result)
    } catch (error){
        if (error.isJoi === true) return next(createError.BadRequest("Login failed! Please ensure the credentials and password are valid."))
        next(error)
    }
})

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh-token route')
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})



module.exports = router
