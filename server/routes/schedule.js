const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Schedule = require("../models/Schedule");
const Doctor = require("../models/Doctor");

router.post("/", verifyToken, async (req, res) => {
  try {
    const schedule = new Schedule({
      doctorId: req.body.doctorId,
      userId: req.body.userId,
      dayOfExam: req.body.dayOfExam,
      monthOfExam: req.body.monthOfExam,
      yearOfExam: req.body.yearOfExam,
      timeSlot: req.body.timeSlot,
      status: "open",
    });

    Schedule.findOne({
      doctorId: req.body.doctorId,
      userId: req.body.userId,
      dayOfExam: req.body.dayOfExam,
      monthOfExam: req.body.monthOfExam,
      yearOfExam: req.body.yearOfExam,
      timeSlot: req.body.timeSlot,
      status: "open",
    }).then((existingSchedule) => {
      if (existingSchedule) {
        // schedule already exists in database
        return res.status(400).json({ success: false, message: "Schedule already exists" });
      } else {
        // schedule does not exist in database yet
        schedule
          .save()
          .then((savedSchedule) => res.json(savedSchedule))
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error while saving schedule" });
          });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while saving schedule" });
  }
});

router.get("/by-doctor/:dayOfExam/:monthOfExam/:yearOfExam/:doctorId", verifyToken, async (req, res) => {
  try {
    const schedules = await Schedule.find({
      dayOfExam: req.params.dayOfExam,
      monthOfExam: req.params.monthOfExam,
      yearOfExam: req.params.yearOfExam,
      doctorId: req.params.doctorId,
    }).select('timeSlot');
    res.json({ success: true, timeslots: schedules.map(schedule => schedule.timeSlot) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/by-time/:dayOfExam/:monthOfExam/:yearOfExam/:timeslot/:majority?", verifyToken, async (req, res) => {
  try {
    const existingSchedules = await Schedule.find({
      dayOfExam: req.params.dayOfExam,
      monthOfExam: req.params.monthOfExam,
      yearOfExam: req.params.yearOfExam,
      timeSlot: req.params.timeslot,
    });

    const bookedDoctorIds = existingSchedules.map((schedule) => schedule.doctorId) || [];

    let query = { _id: { $nin: bookedDoctorIds } };
    if (req.params.majority) {
      query.majority = req.params.majority;
    }

    const doctors = await Doctor.find(query).select('_id fullname gender dob rank majority majorityFull desc avaImage');
    res.json({ success: true, doctors: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



module.exports = router;
