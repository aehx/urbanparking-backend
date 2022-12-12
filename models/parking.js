const mongoose = require("mongoose");

const parkingSchema = mongoose.Schema({
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
});

const Parking = mongoose.model("parkings", parkingSchema);

module.exports = Parking;
