const express = require("express");
const router = express.Router();
const con = require("./../database");

router.get("/getall", async (req, res) => {
  let query = `select * from users`;
  con.query(query, (err, result) => {
    res.json({
      status: 200,
      type: "success",
      message: "",
      data: result,
    });
  });
});

router.post("/add", async (req, res) => {
  let query = `SELECT * FROM users WHERE username = '${req.body.username}'`;
  con.query(query, (err, result) => {
    if (result.length) {
      res.json({
        status: 405,
        type: "error",
        message: "Username Taken",
        message2: `${req.body.username} is taken by ${result[0].fullname}`,
      });
    } else {
      query = `INSERT INTO users (username, fullname, phone, email, details) VALUES('${req.body.username}','${req.body.fullname}','${req.body.phone}','${req.body.email}','${req.body.details}')`;
      con.query(query);
      res.json({
        status: 205,
        type: "info",
        message: "Member add Successfull",
        message2: `${req.body.fullname} added Successfully`,
      });
    }
  });
});

module.exports = router;
