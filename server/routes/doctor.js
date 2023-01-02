const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const Doctor = require("../models/Doctor");

router.post("/auth/register", async (req, res) => {
  const {
    doctorname,
    password,
    email,
    fullname,
    gender,
    dob,
    rank,
		majority,
		majorityFull,
    workday,
    desc,
    avaImage,
  } = req.body;

  if (!doctorname || !password || !email || !fullname || !dob || !gender || !majority)
    return res
      .status(400)
      .json({
        success: false,
        message: "Please fill in all required fields",
      });

  try {
    const doctor = await Doctor.findOne({ doctorname: doctorname });

    if (doctor)
      return res
        .status(400)
        .json({ success: false, message: "Doctorname already existed" });

    const hashedPassword = await argon2.hash(password);
    const newDoctor = new Doctor({
      doctorname,
      password: hashedPassword,
      email,
      fullname,
      gender,
      dob,
      rank,
			majority,
			majorityFull,
      workday,
      desc,
      avaImage,
    });
    await newDoctor.save();

    const accessToken = jwt.sign(
      { doctorId: newDoctor._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Doctor created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something wrong" });
  }
});

router.post("/auth/login", async (req, res) => {
  const { doctorname, password } = req.body;

  if (!doctorname || !password)
    return res
      .status(400)
      .json({
        success: false,
        message: "Please fill in all required fields",
      });

  try {
    //check existing doctor
    const doctor = await Doctor.findOne({ doctorname: doctorname });
    if (!doctor)
      return res
        .status(400)
        .json({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        });

    //doctorname found
    const passwordValid = await argon2.verify(doctor.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        });

    // All good, return token
    const accessToken = jwt.sign(
      { doctorId: doctor._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ success: true, message: "Login successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something wrong" });
  }
});

router.get("/", verifyToken, async (req, res) => {
	try {
		const doctors = await Doctor.find().select('_id fullname gender dob rank majority majorityFull desc avaImage');
    res.status(200).json({ success: true, doctors });
	} catch (error) {
		console.log(error);
    res.status(500).json({ success: false, message: "Something wrong" });
	}
});

router.get("/list/:majority", verifyToken, async (req, res) => {
	try {
		const majority = req.params.majority;
		const doctors = await Doctor.find({ majority: majority }).select('_id fullname gender dob rank majority majorityFull desc avaImage');
    res.status(200).json({ success: true, doctors });
	} catch (error) {	
		console.log(error);
    res.status(500).json({ success: false, message: "Something wrong" });
	}
});

module.exports = router;
