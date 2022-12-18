var express = require("express");
var router = express.Router();
const { checkbody } = require("../module/checkbody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const User = require("../models/user");

// SIGNUP USER

router.post("/signup", (req, res) => {
  console.log("outside", req.body);
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
        console.log("inside ", req.body);
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

// UPDATE USER INFOS

router.put("/update/:token", (req, res) => {
  const { token } = req.params;
  User.updateOne({ token }, req.body).then(() => {
    User.findOne({ token }).then((data) => {
      res.json({ result: data });
    });
  });
});

// ADD FAVORIS

router.put("/favoris/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((user) => {
    if (user.favoris.includes(req.body.parkId)) {
      User.updateOne(
        { token: req.params.token },
        { $pull: { favoris: req.body.parkId } }
      ).then(() => {
        res.json({ result: true, parkId: req.body.parkId });
      });
    } else {
      User.updateOne(
        { token: req.params.token },
        { $push: { favoris: req.body.parkId } }
      ).then(() => {
        res.json({ result: true });
      });
    }
  });
});

// GET FAVORIS

router.get("/favoris/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((user) => {
    res.json({ result: true, favoris: user.favoris });
  });
});

module.exports = router;
