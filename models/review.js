const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  notation: Number,
  content: String,
  creation_Date: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  //   parkId: { type: mongoose.Schema.Types.ObjectId, ref: "parking" },
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
