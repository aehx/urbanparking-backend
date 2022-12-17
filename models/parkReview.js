const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  parking: String,
  rating: Number,
  content: String,
  creation_Date: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
