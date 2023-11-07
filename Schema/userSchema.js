const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required"],
  },
  email: {
    type: String,
    required: [true, "Email is a required"],
  },
  image: String,
  password: {
    type: String,
    required: [true, "This is a required"],
  },
  uniqueId: {
    type: String,
    required: true,
  },
  image: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
