const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  // userId: {
  //   type: String,
  //   required: [true, "User Id require"],
  // },
  videoId: {
    type: mongoose.Types.ObjectId,
    ref: "Videos",
    required: [true, "Video id require"],
  },
  // userName: {
  //   type: String,
  //   required: [true, "This is a required"],
  // },
  email: {
    type: String,
    default: "",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
