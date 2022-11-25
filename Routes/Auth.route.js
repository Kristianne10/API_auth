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
const Form = require('../Models/User.model')
const CreatedForm = require('../Models/User.model')

//const {authSchema, loginSchema} = require('../helpers/Validation');
const {authSchema} = require('../helpers/Validation');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt');

// define the routes

// REGISTER USERS
router.post('/register', async (req, res, next) => {
    //console.log(req.body)
    try {

        // validating req.body using authSchema (Joi)
        const result = await authSchema.validateAsync(req.body)

        const emailExist = await User.findOne({email: result.email})
        if (emailExist) 
            throw createError.Conflict(result.email + ' already exists')
    
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
        const user = await User.findOne({email: req.body.email})
        if (!user) throw createError.NotFound("Your credentials did not match our record.")
        
        const isMatch = await user.isValidPassword(req.body.password)
         if (!isMatch) throw createError.Unauthorized('Please ensure that your credentials are valid.')

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



router.post('/forms', async (req, res, next) => {

    var id = req.params.id;
    var forms = new Form({
        title: req.body.title, 
        description: req.body.description,
    })

    forms.save().then((docs) => {
        res.send(docs);
        console.log(docs)
    }).catch((e) => res.status(404).send(e)); 

    CreatedForm.findById(id).then((docs) => {
        if(!docs) {
            res.status(404).send();
        }
        docs.formIDs.push(forms._id);
    }).catch((e) => {
        res.send(e).status(404);
    })
})


module.exports = router
