const express = require('express');
const router = express.Router();
require('dotenv').config();

const Department = require('../Models/Department.model');
const Program = require('../Models/Department.model');

router.post('/department', async (req, res, next) => {
    try {

        const {deptName,progName}  = req.body
        const department = new Department({deptName,progName})
        const savedDept_and_prog = await department.save()

        res.send(savedDept_and_prog)
    } catch (error){
        next(error)
    }
})

module.exports = router;
