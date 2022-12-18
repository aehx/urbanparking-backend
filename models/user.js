const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  city: String,
  address: String,
  postal: Number,
  password: String,
  favoris: [],
  token: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
