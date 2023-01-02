const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Schedule = require("../models/Schedule");

router.post("/schedule", verifyToken, async (req, res) => {
  const { 
		doctorId,
		userId,
		dayOfExam,
		timeSlot,
		status,
	} = req.body;

	if (!doctorId || !userId || !dayOfExam || !timeSlot)
		return res
			.status(400)
			.json({
				success: false,
				message: "Please fill in all required fields",
			});

	try {
		const schedule = await Schedule.findOne({ doctorId: doctorId, dayOfExam: dayOfExam, timeSlot: timeSlot});
		if (schedule)
			return res
				.status(400)
				.json({ success: false, message: "Timeslot already taken" });

		const newSchedule = new Schedule(doctorId, userId, dayOfExam, timeSlot, status);
		await newSchedule.save();

		res.json({success: true, message: "Booking successfully"});
	} catch (err) {
		console.log(err);
    res.status(500).json({ success: false, message: "Something wrong" });
	}
});

module.exports = router;
