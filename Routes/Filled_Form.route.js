const express = require('express');
const router = express.Router();

const FilledForm = require('../Models/Filled_Form.model');

router.post('/filledForm', async (req, res, next) => {
    try {
        const filled = new FilledForm(req.body)
        const result = await filled.save();
        console.log(result);
        res.send(result);

    } catch (error){
        next(error);
    }
})

module.exports = router;