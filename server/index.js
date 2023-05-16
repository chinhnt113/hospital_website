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

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/schedule", scheduleRouter);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const server1 = app.listen(5000, () => {
  console.log("Server started on port 5000");
});

const server2 = app.listen(5001, () => {
  console.log("Server started on port 5001");
});

const server3 = app.listen(5002, () => {
  console.log("Server started on port 5002");
});

module.exports = { server1, server2, server3 };
