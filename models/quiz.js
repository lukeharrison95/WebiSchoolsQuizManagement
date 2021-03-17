const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        question: {
            type: String,
            required: true
        },
        answers: {
            answer:{
                type: String,
                required: true
            },
            correct: {
                type: Boolean,
                required: true
            }
        }
    }
})

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
