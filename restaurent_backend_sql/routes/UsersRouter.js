const express = require("express");
const router = express.Router();
const con = require('./../database')

router.get("/getuserdata/:username", async (req, res) => {
  let query = (`select * from users where username = "${req.params.username}"`)
  con.query(query, (err, result) => {
    if (result.length) {
      res.json({
        status: 200,
        type: "success",
        message: "",
        data: result,
      });
    }
    else {
      res.json({
        status: 405,
        type: "error",
        message: "User not found",
        message2: "Please give a valid user data...",
      });
    }
  })
})

router.get("/getmealdata/:username", async (req, res) => {
  let query = (`select * from meal where username = "${req.params.username}"`)
  con.query(query, (err, result) => {
    res.json({
      status: 200,
      type: "success",
      message: "",
      data: result,
    });
  })
})

router.get("/getpaymentdata/:username", async (req, res) => {
  let query = (`select * from payment where username = "${req.params.username}"`)
  con.query(query, (err, result) => {
    res.json({
      status: 200,
      type: "success",
      message: "",
      data: result,
    });
  })
})

router.get("/getbalancedata/:username", async (req, res) => {
  let query = (`select * from balance_history where username = "${req.params.username}"`)
  con.query(query, (err, result) => {
    res.json({
      status: 200,
      type: "success",
      message: "",
      data: result,
    });
  })
})

module.exports = router;
