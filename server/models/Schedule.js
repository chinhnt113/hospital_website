const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    doctorId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    dayOfExam: {
        type: Date,
        required: true
    },
    timeOfExam: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('schedule', ScheduleSchema);