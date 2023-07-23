const mongoose = require("mongoose");
require('mongoose-regex-search');
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

PostSchema.plugin(require('mongoose-regex-search'));

module.exports = mongoose.model("posts", PostSchema);
