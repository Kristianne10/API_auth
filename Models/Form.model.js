const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Department.model');


const TargetDept_Schema = new Schema({
    targetId: [{type: mongoose.Schema.ObjectId, ref: 'Department'}]
})

const FormSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    target : [TargetDept_Schema],
    // target:  [{ type: mongoose.Schema.ObjectId, ref: 'Department'}],
    createdAt: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    }
});
const Form = mongoose.model('form', FormSchema);
module.exports = Form;

