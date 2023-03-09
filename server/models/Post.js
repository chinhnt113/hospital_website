const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    url_title: {
      type: String,
      unique: true,
    },
    snippet: {
      type: String,
    },
    content: {
      type: String,
    },
    majority: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
