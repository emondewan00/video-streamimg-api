const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: [true, "Video id require"],
  },
  email: {
    type: String,
    required: true,
  },
  isLike: {
    type: Boolean,
    enum: [true, false, null],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model("Likes", likeSchema);
module.exports = Like;
