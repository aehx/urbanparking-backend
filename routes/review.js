var express = require("express");
var router = express.Router();
const { checkbody } = require("../module/checkbody");
const Review = require("../models/parkReview");
const User = require("../models/user");

// ROUTE

// POST REVIEW

router.post("/postReview", (req, res) => {
  if (!checkbody(req.body, ["content", "parking"])) {
    res.json({ result: false, error: "champs non remplis ou ommis" });
    return;
  }
  User.findOne({ token: req.body.token }).then((user) => {
    if (user === null) {
      res.json({ result: false, error: "User not found" });
    }
    const newReview = new Review({
      author: user._id,
      parking: req.body.parking,
      content: req.body.content,
      creation_Date: new Date(),
    });
    newReview.save().then((data) => {
      res.json({ data: data });
    });
  });
});

// GET REVIEW

router.get("/all/:id", (req, res) => {
  Review.find({ parking: req.params.id })
    .populate("author")
    .then((review) => {
      res.json({ result: true, review });
    });
});

router.delete("/deleteReview/:token", (req, res) => {
  User.findOne({ token: req.body.token }).then((user) => {
    if (user === null) {
      res.json({ result: false, error: "User not found", user });
      return;
    }

    Review.findById(req.body.reviewId)
      .populate("author")
      .then((review) => {
        if (!review) {
          res.json({ result: false, error: "Review not found" });
          return;
        } else if (String(review.author._id) !== String(user._id)) {
          res.json({
            result: false,
            error: "Review can only be deleted by its author",
          });
          return;
        }

        Review.deleteOne({ _id: review._id }).then(() => {
          res.json({ result: true });
        });
      });
  });
});

module.exports = router;
