const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthSchema = require("../schemas/AuthSchema");
const auths = new mongoose.model("auths", AuthSchema);

router.post("/signup", async (req, res) => {
  try {
    const auth = await auths.find({ username: req.body.username });
    if (auth && auth.length > 0) {
      res.status(500).json({
        error: "Username Taken!!!",
        message: "Username already taken",
      });
    } else {
      const haspassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new auths({ ...req.body, password: haspassword });
      await newUser.save();

      res.status(200).json({ message: "Successfull" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error", err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const auth = await auths.find({ username: req.body.username });
    if (auth && auth.length > 0) {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        auth[0].password
      );
      if (isValidPass) {
        var token = jwt.sign({ userId: auth[0]._id }, "accesstoken");
        res.json({
          status: 200,
          type: "success",
          message: "Authenticated!!!",
          data: { access_token: token },
        });
      } else {
        res.json({ status: 400,  type:'error', message: "Wrong Password", message2:"Enter a valid Password!" });
      }
    } else {
      res.json({ status: 422, type:'error', message: "Invalid User", message2:"User Not Found!" });
    }
  } catch (err) {
    res.json({ status: 500, message: "Error" });
  }
});

module.exports = router;
