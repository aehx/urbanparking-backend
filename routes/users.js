var express = require("express");
var router = express.Router();
const { checkbody } = require("../module/checkbody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const User = require("../models/user");

// SIGNUP USER

router.post("/signup", (req, res) => {
  console.log(req.body);
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
        console.log(req.body);
        console.log(req);
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
            username: data.username,
            firstname: data.firstname,
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
          username: data.username,
          firstname: data.firstname,
        });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});
router.get("/update/:token", (req, res) => {
  const { token } = req.params;
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
  for (let key in req.body) {
    if (!key || key === "") {
    }
  }
  User.findOne({ token: req.params.token }).then((data) => {
    res.json({ result: true, data });
    // User.updateOne({token:token}).then()
  });
});
module.exports = router;
