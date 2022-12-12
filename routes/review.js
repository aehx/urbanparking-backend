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
    console.log(data);
    if (data === null) {
      res.json({ result: false, error: "User not found" });
    }
    const newReview = new Review({
      author: data._id,
      content: req.body.content,
      notation: req.body.notation,
      creation_Date: new Date(),
    });
    newReview.save().then((data) => {
      res.json({ data: data });
      console.log(data);
    });
  });
});

router.post("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
