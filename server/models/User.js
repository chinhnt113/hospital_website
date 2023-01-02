const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "không thể để trống"],
      match: [/^[a-zA-Z0-9]+$/, "không đúng cú pháp"],
      index: true,
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
      enum: ["male", "female"],
    },
    dob: {
      type: Date,
      required: true,
    },
    bhytId: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
