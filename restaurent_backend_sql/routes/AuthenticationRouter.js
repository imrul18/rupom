const express = require("express");
const router = express.Router();
const con = require('./../database')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  let query = (`select * from auth where username = "${req.body.username}"`)
  con.query(query, async (err, result) => {
    if (result.length) {
      res.json({
        status: 400,
        type: "error",
        message: "Username Taken!!!",
        data: `${req.body.username} already taken by ${result[0].fullname}`,
      });
    }
    else {
      const haspassword = await bcrypt.hash(req.body.password, 10);
      query = `INSERT INTO auth (username, password) VALUES ('${req.body.username}','${haspassword}');`
      con.query(query)
      res.json({
        status: 205,
        type: "info",
        message: "Account Created",
        message2: "Account Created Successfully",
      });
    }
  })
});

router.post("/login", async (req, res) => {
  let query = (`select * from auth where username = "${req.body.username}"`)
  con.query(query, async (err, result) => {
    if (result.length) {
      let auth = result[0]
      const isValidPass = await bcrypt.compare(
        req.body.password,
        auth.password
      );
      if (isValidPass) {
        var token = jwt.sign({ username: auth.username }, "accesstoken");
        res.json({
          status: 200,
          type: "success",
          message: "Authenticated!!!",
          data: { access_token: token },
        });
      } else {
        res.json({ status: 400, type: 'error', message: "Wrong Password", message2: "Enter a valid Password!" });
      }
    } else {
      res.json({
        status: 405,
        type: "error",
        message: "User not found",
        message2: "Please give a valid username...",
      });
    }
  })
})

module.exports = router;
