const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: String,
  number: { type: String, unique: true },
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
