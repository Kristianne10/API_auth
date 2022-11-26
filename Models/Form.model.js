const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    }
});
const Form = mongoose.model('form', FormSchema);
module.exports = Form;
