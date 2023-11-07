const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
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

const History = mongoose.model("History", historySchema);

module.exports = History;
