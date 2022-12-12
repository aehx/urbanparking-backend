var express = require("express");
var router = express.Router();
const { checkbody } = require("../module/checkbody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const User = require("../models/user");

// SIGNUP USER

router.post("/signup", (req, res) => {
  if (!checkbody(req.body, ["username", "password", "email"])) {
    res.json({ result: false, error: "missing or empty fields" });
    return;
  }
  const {
    username,
    firstname,
    lastname,
    email,
    city,
    address,
    postal,
    password,
  } = req.body;
  User.findOne({ username: { $regex: new RegExp(username, "i") } }).then(
    (data) => {
      if (data === null) {
        const hash = bcrypt.hashSync(password, 10);
        const newUser = new User({
          username,
          firstname,
          lastname,
          email,
          city,
          address,
          postal,
          password: hash,
          token: uid2(32),
        });

        newUser.save().then((data) => {
          res.json({
            result: true,
            token: data.token,
            firstname: data.firstname,
            username: data.username,
          });
        });
      } else {
        res.json({ result: false, error: "User already exist" });
      }
    }
  );
});

// ROUTE SIGNIN

router.post("/signin", (req, res) => {
  if (!checkbody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const { username, password } = req.body;

  User.findOne({ username: { $regex: new RegExp(username, "i") } }).then(
    (data) => {
      if (data && bcrypt.compareSync(password, data.password)) {
        res.json({
          result: true,
          token: data.token,
          firstname: data.firstname,
          username: data.username,
        });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});

router.get("/", (req, res) => {
  User.find().then((data) => {
    res.json({ result: true, data });
  });
});

module.exports = router;
