require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const doctorRouter = require("./routes/doctor");
const scheduleRouter = require("./routes/schedule");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.y5pqb.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware để đếm số lần nhận API
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  console.log(`Received request ${requestCount}: ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/schedule", scheduleRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
