const mongoose = require("mongoose");

const parkingSchema = mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  id: String,
  horaire: String,
});
const userSchema = mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  city: String,
  address: String,
  postal: Number,
  password: String,
  favoris: [parkingSchema],
  token: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
