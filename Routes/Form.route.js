const express = require('express');
const router = express.Router();
require('dotenv').config();
const Form = require('../Models/Form.model');
const Data = require('../Models/Data.model');
const Answer = require('../Models/Answer.model');

router.post('/forms', async (req, res, next) => {

    try {
        const forms = new Form(req.body)
        const result = await forms.save();
        console.log(result);
        res.send(result);

    } catch (error){
        next(error);
    }

})

// get all the list of forms
router.get('/ListOfForms', async (req, res, next) => {

    try {
        const FormList = await Form.find({}).populate()
        res.send(FormList)
    } catch (error){
        next(error);
    }

});




router.post('/input', async (req, res, next) => {
    try {
        const data = new Data(req.body)
        const savedData = await data.save()
        
        res.send({savedData})
    } catch (error){
        next(error);
    }

});

router.post('/answer', async (req, res, next) => {
    try {
        const answer = new Answer(req.body)
        const savedAnswer = await answer.save()
        
        res.send({savedAnswer})
    } catch (error){
        next(error);
    }

});


router.post('/title', async (req, res, next) => {
    try {
        const FormTitle = (req.body.wtitle)
        const FormList = await Data.findOne({title: FormTitle})
        res.send(JSON.stringify(FormList))
        console.log(FormList)
    } catch (error){
        next(error);
    }

})


module.exports = router;