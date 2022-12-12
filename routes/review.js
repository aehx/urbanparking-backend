var express = require("express");
var router = express.Router();
const { checkbody } = require("../module/checkbody");
const Review = require("../models/review");
const User = require("../models/user");

// ROUTE POST REVIEW

router.post("/post", (req, res) => {
  if (!checkbody(req.body, ["notation", "content"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ token: req.body.token }).then((data) => {
    if (data === null) {
      res.json({ result: false, error: "User not found" });
    }
  });
  const newReview = new Review({
    author: "6396d2a96cb214f11a5a2c69",
    content: req.body.content,
    notation: req.body.notation,
    creation_Date: new Date(),
  });
  newReview.save().then((data) => {
    console.log(data);
  });
});

router.post("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
