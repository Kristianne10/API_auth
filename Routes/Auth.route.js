const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../Models/User.model');

const {authSchema} = require('../helpers/Validation');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt');


// define the routes

// REGISTER USERS
router.post('/register', async (req, res, next) => {
    //console.log(req.body)
    try {

        // validating req.body using authSchema (Joi)
        const result = await authSchema.validateAsync(req.body)

        const emailExist = await User.findOne({email: result.email}).exec();
        if (emailExist) {
            throw createError.Conflict(result.email + ' already exists')
        }

        // if email doesn't exist, add another user
        const user = new User(result)
        const savedUser = await user.save()

        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)

        res.send({accessToken, refreshToken})

        //res.send(savedUser)
    } catch (error){
        // if error is comming from Joi
        if (error.isJoi === true) error.status = 422    // 422 Unprocessable Entity
        next(error)

    }
});

router.post('/login', async (req, res, next) => {
    try {
                // find user inside users(Collection)
        const user = await User.findOne({email: req.body.email}).exec();
        if (!user) throw createError.NotFound("Your credentials did not match our record.")
        
        const isMatch = await user.isValidPassword(req.body.password)
        if (!isMatch) throw createError.Unauthorized('Please ensure that your credentials are valid.')

        // to see if the user has already verified the otp code.
        // unable to log in without verifying the OTP code. 
        
        if (!user.verified){
            throw createError("Email hasn't been verified yet. Check your email."); 
        }

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
        res.send({ accessToken, refreshToken})
        
        //res.send(result)
    } catch (error){
        next(error)
    }
})

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
        next(error)
    }
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})


module.exports = router
