const express = require("express");
const router = express.Router();
const con = require('./../database')

router.post("/add", async (req, res) => {
  let query = (`select * from users where username = "${req.body.username}"`)
  con.query(query, (err, result) => {
    if (result.length) {
      let query = `UPDATE users SET balance = balance + ${req.body.amount} WHERE username = '${req.body.username}'`
      con.query(query)
      query = `INSERT INTO balance_history (username, amount, current_amount, details) VALUES ('${req.body.username}', ${req.body.amount}, ${req.body.amount}+ ${result[0].balance} , 'payment');`
      con.query(query)
      query = `INSERT INTO payment (username, amount, comment) VALUES ('${req.body.username}', ${req.body.amount}, '${req.body.comment}');`
      con.query(query)
      res.json({
        status: 205,
        type: "info",
        message: "Payment Successfull",
        message2: `${req.body.amount}tk added to ${result[0].fullname}'s account`,
      });
    }
    else {
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
