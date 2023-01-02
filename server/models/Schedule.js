const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "doctors",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    dayOfExam: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedule", ScheduleSchema);
