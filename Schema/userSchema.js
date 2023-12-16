const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: [true, "Name is a required"],
  },
  email: {
    type: String,
    required: [true, "Email is a required"],
    unique: true,
  },
  photoUrl: String,
  comments: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "Active",
    require: true,
  },
  status: {
    type: String,
    default: "Active",
    enum: {
      values: ["Active", "Banned"],
      message: "{VALUE} is not supported",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// userSchema.index({ displayName: "text" });

userSchema.pre("save", function (next) {
  this.role = "user";
  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
