const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const User = require("../models/User");

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// @route POST api/auth/register
// @desc Register a user
// @access public
router.post("/register", async (req, res) => {
  const { username, password, email, fullname, gender, dob, bhytId } = req.body;

  //validate
  if (!username || !password || !email || !fullname || !dob)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin vào các trường" });

  try {
    //check existing user
    const user = await User.findOne({ username: username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập đã tồn tại" });

    //All good, create
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      fullname,
      gender,
      dob,
      bhytId,
    });
    console.log(newUser);
    await newUser.save();

    //return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// @route POST api/auth/login
// @desc Login
// @access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin vào các trường" });

  try {
    //check existing user
    const user = await User.findOne({ username: username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });

    //Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });

    // All good, return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ success: true, message: "Login successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

router.get("/", (req, res) => res.send("USER ROUTE"));

module.exports = router;
