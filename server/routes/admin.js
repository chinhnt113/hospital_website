const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const Admin = require("../models/Admins");

router.get("/", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin)
      return res
        .status(400)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    res.json({ success: true, admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { adminname, password, fullname } = req.body;

  //validate
  if (!adminname || !password || !fullname)
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all required fields" });

  try {
    //check existing admin
    const admin = await Admin.findOne({ adminname: adminname });

    if (admin)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập đã tồn tại" });

    //All good, create
    const hashedPassword = await argon2.hash(password);
    const newAdmin = new Admin({
      adminname,
      password: hashedPassword,
      fullname,
    });
    console.log(newAdmin);
    await newAdmin.save();

    //return token
    const accessToken = jwt.sign(
      { adminId: newAdmin._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Admin created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { adminname, password } = req.body;

  //validation
  if (!adminname || !password)
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all required fields" });

  try {
    //check existing admin
    const admin = await Admin.findOne({ adminname: adminname });
    if (!admin)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });

    //Adminname found
    const passwordValid = await argon2.verify(admin.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });

    // All good, return token
    const accessToken = jwt.sign(
      { adminId: admin._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ success: true, message: "Login successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something wrong" });
  }
});

router.get("/", (req, res) => res.send("ADMIN ROUTE"));

module.exports = router;
