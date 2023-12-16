const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "This is a required "],
  },
  // userName: {
  //   type: String,
  //   required: [true, "This is a required"],
  // },
  videoId: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: [true, "This is a required"],
  },
  // userId: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  //   required: [true, "This is a required"],
  // },
  email: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comments", commentSchema);
module.exports = Comment;
