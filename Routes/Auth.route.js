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

// define the routes

// REGISTER USERS
router.post('/register', async (req, res, next) => {
    //console.log(req.body)
    try {
        const {name,email,password,srcode}  = req.body
        if (!name || !email || !password || !srcode) throw createError.BadRequest()
        
        const emailExist = await User.findOne({email: email})
        if (emailExist) 
            throw createError.Conflict(email + ' already exist')
    
        // if email doesn't exist, add another user
        const user = new User({name,email,password,srcode})
        const savedUser = await user.save()

        res.send(savedUser)
    } catch (error){
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
