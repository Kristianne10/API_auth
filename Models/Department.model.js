const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    deptName: String,
    progName: [
        {
            Program: String
        }
    ]
    
});
const Department = mongoose.model('department', DepartmentSchema);
module.exports = Department;