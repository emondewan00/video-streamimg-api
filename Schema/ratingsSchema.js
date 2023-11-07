const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema({
  ratings: {
    type: String,
    required: [true, "Rating is a required "],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User Id require"],
  },
  videoId: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: [true, "Video id require"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
