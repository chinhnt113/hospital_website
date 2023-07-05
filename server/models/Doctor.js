const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    doctorname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "không thể để trôngs"],
      match: [/\S+@\S+\.\S+/, "không đúng cú pháp"],
      index: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },
    dob: {
      type: Date,
      required: true,
    },
    rank: {
      type: String,
      default: "Bác sĩ",
    },
    majority: {
      type: String,
      required: true,
    },
    majorityFull: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctors", DoctorSchema);
