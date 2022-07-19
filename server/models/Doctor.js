const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    doctorname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    rank: {
        type: String,
        default: 'Bác sĩ'
    },
    workday: {
        type: [Number],
        default: null,
    },
    desc: {
        type: String,
    },
    avaImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('doctors', DoctorSchema);