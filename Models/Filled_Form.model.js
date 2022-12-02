const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Form.model');

const FilledForm_Schema = new Schema({
    formId: [{
        type: mongoose.Schema.ObjectId, ref: 'form'
    }],
    FilledDate: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    }
})
const FilledForm = mongoose.model('filledform', FilledForm_Schema);
module.exports = FilledForm;