var express = require("express");
var router = express.Router();
const { checkbody } = require("../module/checkbody");
const Review = require("../models/parkReview");
const User = require("../models/user");

// ROUTE

// POST REVIEW

router.post("/post", (req, res) => {
  if (!checkbody(req.body, ["notation", "content", "parking"])) {
    res.json({ result: false, error: "Missing or empty fields" });
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
      notation: req.body.notation,
      creation_Date: new Date(),
    });
    newReview.save().then((data) => {
      res.json({ data: data });
    });
  });
});

// GET REVIEW

router.get("/all/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((user) => {
    if (user === null) {
      res.json({ result: false, error: "User not found" });
      return;
    }

    Review.find()
      .populate("author")
      .then((review) => {
        res.json({ result: true, review });
      });
  });
});

// DELETE

router.delete("/delete", (req, res) => {
  if (!checkbody(req.body, ["token", "reviewId"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ token: req.body.token }).then((user) => {
    if (user === null) {
      res.json({ result: false, error: "User not found" });
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

router.post("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
