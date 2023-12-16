const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name is required field"],
    trim: true,
  },
  video: {
    type: String,
    default: "https://youtu.be/yVYQeDhAQWk?si=yfIgXe3uNHkRzkq0",
    // required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quaerat eveniet aliquid porro vitae molestiae nostrum provident reiciendis cum esse?",
    // required: [true, "Description is required field"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required field "],
  },
  showInBanner: {
    type: String,
    default: "hide",
  },
  visibility: {
    type: String,
    default: "visible",
  },
  publicIn: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// videoSchema.index({ title: "text", tags: "text" });

// videoSchema.pre("find", function () {
//   this.find({ publicIn: { $lte: Date.now() } });
// });

const Video = mongoose.model("Videos", videoSchema);
module.exports = Video;
