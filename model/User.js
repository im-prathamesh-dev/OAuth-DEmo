const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    lastLogin: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);