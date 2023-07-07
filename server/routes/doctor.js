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

  if (
    !doctorname ||
    !password ||
    !email ||
    !fullname ||
    !dob ||
    !gender ||
    !majority
  )
    return res.status(400).json({
      success: false,
      message: "Hãy điền đủ hết tất cả các trường",
    });

  try {
    const doctor = await Doctor.findOne({ doctorname: doctorname });

    if (doctor)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập bác sĩ đã tồn tại" });

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
      message: "Tạo tài khoản bác sĩ thành công",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
  }
});

router.post("/auth/login", async (req, res) => {
  const { doctorname, password } = req.body;

  if (!doctorname || !password)
    return res.status(400).json({
      success: false,
      message: "Hãy điền đủ hết tất cả các trường",
    });

  try {
    //check existing doctor
    const doctor = await Doctor.findOne({ doctorname: doctorname });
    if (!doctor)
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
      });

    //doctorname found
    const passwordValid = await argon2.verify(doctor.password, password);
    if (!passwordValid)
      return res.status(400).json({
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
    res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const doctors = await Doctor.find().select(
      "_id fullname gender dob rank majority majorityFull desc avaImage workday"
    );
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
  }
});

router.get("/majority/:majority", verifyToken, async (req, res) => {
  try {
    const majority = req.params.majority;
    const doctors = await Doctor.find({ majority: majority }).select(
      "_id fullname gender dob rank majority majorityFull desc avaImage workday"
    );
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
  }
});

router.get("/highlight", verifyToken, async (req, res) => {
  try {
    const doctors = await Doctor.aggregate([
      {
        $match: {
          rank: {
            $regex: /tiến sĩ|thạc sĩ|giáo sư/i,
          },
        },
      },
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          fullname: 1,
          gender: 1,
          dob: 1,
          rank: 1,
          majority: 1,
          majorityFull: 1,
          desc: 1,
          avaImage: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
  }
});

module.exports = router;
