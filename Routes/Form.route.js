const express = require('express');
const router = express.Router();
require('dotenv').config();
const Form = require('../Models/Form.model')

router.post('/forms', async (req, res, next) => {

    try {
        const forms = new Form(req.body);
        const result = await forms.save();
        console.log(result);
        res.send(result);

    } catch (error){
        next(error);
    }

})

module.exports = router;