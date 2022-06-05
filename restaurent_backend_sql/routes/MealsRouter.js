const express = require("express");
const router = express.Router();
const con = require('./../database')

router.post("/addbreakfast", async (req, res) => {
  let query = (`select * from users where username = "${req.body.username}"`)
  con.query(query, (err, result) => {
    if (result.length) {
      let userData = result[0]
      let query = (`select * from meal where username = "${req.body.username}" and breakfast=1 and datetime="${req.body.datetime}"`)
      con.query(query, (err, result) => {
        if (result.length) {
          res.json({
            status: 403,
            type: "error",
            message: "Breakfast Already Added",
            message2: `Breakfast already added to ${userData.fullname}' account...`,
          });
        }
        else {
          let query = `UPDATE users SET balance = balance - 60 WHERE username = '${req.body.username}'`
          con.query(query)
          query = `INSERT INTO balance_history (username, amount, current_amount, details) VALUES ('${req.body.username}', 60, ${userData.balance}-60 , 'breakfast');`
          con.query(query)
          query = `INSERT INTO meal (username, breakfast, datetime) VALUES ('${req.body.username}', 1, '${req.body.datetime}');`
          con.query(query)
          res.json({
            status: 205,
            type: "info",
            message: "Breakfast Added Successfully",
            message2: `Breakfast added to ${userData.fullname}'s account`,
          })
        }

      })
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

router.post("/addlunch", async (req, res) => {
  let query = (`select * from users where username = "${req.body.username}"`)
  con.query(query, (err, result) => {
    if (result.length) {
      let userData = result[0]
      let query = (`select * from meal where username = "${req.body.username}" and lunch=1 and datetime="${req.body.datetime}"`)
      con.query(query, (err, result) => {
        if (result.length) {
          res.json({
            status: 403,
            type: "error",
            message: "Lunch Already Added",
            message2: `Lunch already added to ${userData.fullname}' account...`,
          });
        }
        else {
          let query = (`select * from meal where username = "${req.body.username}" and datetime="${req.body.datetime}"`)
          con.query(query, (err, result) => {
            if (result.length) {
              query = `UPDATE meal SET lunch = 1 where username = "${req.body.username}" and datetime="${req.body.datetime}"`
              con.query(query)
            }
            else {
              query = `INSERT INTO meal (username, lunch, datetime) VALUES ('${req.body.username}', 1, '${req.body.datetime}');`
              con.query(query)
            }
          })
          query = `UPDATE users SET balance = balance - 60 WHERE username = '${req.body.username}'`
          con.query(query)
          query = `INSERT INTO balance_history (username, amount, current_amount, details) VALUES ('${req.body.username}', 60, ${userData.balance}-60 , 'lunch');`
          con.query(query)

          res.json({
            status: 205,
            type: "info",
            message: "Lunch Added Successfully",
            message2: `Lunch added to ${userData.fullname}'s account`,
          })
        }

      })
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

router.post("/adddinner", async (req, res) => {
  let query = (`select * from users where username = "${req.body.username}"`)
  con.query(query, (err, result) => {
    if (result.length) {
      let userData = result[0]
      let query = (`select * from meal where username = "${req.body.username}" and dinner=1 and datetime="${req.body.datetime}"`)
      con.query(query, (err, result) => {
        if (result.length) {
          res.json({
            status: 403,
            type: "error",
            message: "Dinner Already Added",
            message2: `Dinner already added to ${userData.fullname}' account...`,
          });
        }
        else {
          let query = (`select * from meal where username = "${req.body.username}" and datetime="${req.body.datetime}"`)
          con.query(query, (err, result) => {
            if (result.length) {
              query = `UPDATE meal SET dinner = 1 where username = "${req.body.username}" and datetime="${req.body.datetime}"`
              con.query(query)
            }
            else {
              query = `INSERT INTO meal (username, dinner, datetime) VALUES ('${req.body.username}', 1, '${req.body.datetime}');`
              con.query(query)
            }
          })
          query = `UPDATE users SET balance = balance - 60 WHERE username = '${req.body.username}'`
          con.query(query)
          query = `INSERT INTO balance_history (username, amount, current_amount, details) VALUES ('${req.body.username}', 60, ${userData.balance}-60 , 'dinner');`
          con.query(query)

          res.json({
            status: 205,
            type: "info",
            message: "Dinner Added Successfully",
            message2: `Dinner added to ${userData.fullname}'s account`,
          })
        }
      })
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
