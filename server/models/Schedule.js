const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
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
    dayOfExam: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('schedule', ScheduleSchema);