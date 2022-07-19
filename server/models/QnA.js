const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QnaSchema = new Schema({
    doctorname: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "doctors"
    },
    username: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
    }
}, {timestamps: true});

module.exports = mongoose.model('qna', QnaSchema);