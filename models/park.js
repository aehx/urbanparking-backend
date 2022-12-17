const mongoose = require("mongoose");

const parkingSchema = mongoose.Schema({
  favoris: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
});

const Parking = mongoose.model("parkings", parkingSchema);

module.exports = Parking;
