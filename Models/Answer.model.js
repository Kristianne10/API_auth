const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set("autoCreate", false);

const AnswerSchema = new Schema({
    questions: [
        {
        question: "",
        comments: [
            {
            comment: "",
            }
        ] 
        }
    ]
});

const Answer = mongoose.model('answer', AnswerSchema);
module.exports = Answer;