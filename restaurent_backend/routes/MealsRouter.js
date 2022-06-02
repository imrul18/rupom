const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const MealsSchema = require("../schemas/MealsSchema");
const meals = new mongoose.model("meals", MealsSchema);

const UsersSchema = require("../schemas/UsersSchema");
const user = new mongoose.model("users", UsersSchema);

const BalanceHistorySchema = require("../schemas/BalanceHistorySchema");
const balancehistory = new mongoose.model(
  "balancehistory",
  BalanceHistorySchema
);

router.get("/getall", async (req, res) => {
  try {
    const mealData = await meals.find({ user_id: req.params.userid });
    res.json({ status: 200, type: "success", message: "", data: mealData });
  } catch (err) {
    res.json({ status: 500, type: "error", message: "", message2: "" });
  }
});

router.post("/addbyqrcode", async (req, res) => {
  try {
    const userData = await user.find({ _id: req.body.user_id });
    if (userData.length) {
      const e = await meals.find(req.body);
      if (e.length > 0) {
        res.json({
          status: 400,
          type: "error",
          message: "Meal Already Added",
          message2: `Meal already added to ${userData[0]?.fullname}`,
        });
      } else {
        const carry = await meals.find({
          user_id: req.body.user_id,
          datetime: req.body.datetime,
        });
        if (carry.length > 0) {
          await meals.updateOne(
            { user_id: req.body.user_id, datetime: req.body.datetime },
            { $set: req.body }
          );
          await user.updateOne(
            { _id: userData[0]._id },
            { $set: { balance: userData[0].balance - 60 } }
          );
          const newBalanceHistory = new balancehistory({user_id:userData[0]._id, amount: "-60", current_amount: parseInt(userData[0].balance) - 60, details: 'payment'});
    await newBalanceHistory.save();
          res.json({
            status: 201,
            type: "info",
            message: "Meal Added",
            message2: `Meal added to ${userData[0]?.fullname}`,
          });
        } else {
          const newMeal = new meals(req.body);
          await newMeal.save();
          await user.updateOne(
            { _id: userData[0]._id },
            { $set: { balance: userData[0].balance - 60 } }
          );
          const newBalanceHistory = new balancehistory({user_id:userData[0]._id, amount: "-60", current_amount: parseInt(userData[0].balance) - 60, details: 'payment'});
    await newBalanceHistory.save();
          res.json({
            status: 200,
            type: "info",
            message: "Meal Added",
            message2: `Meal added to ${userData[0]?.fullname}`,
          });
        }
      }
    } else {
      res.json({
        status: 400,
        type: "error",
        message: "User Not Found",
        message2: `User Not Found`,
      });
    }
  } catch (err) {
    res.json({
      status: 400,
      type: "error",
      message: "User Not Found",
      message2: `User Not Found`,
    });
  }
});

router.post("/addbyqrusername", async (req, res) => {
  try {
    const userData = await user.find({ username: req.body.username });
    if (userData.length) {
      const e = await meals.find({ ...req.body, user_id: userData[0]._id });
      if (e.length > 0) {
        res.json({
          status: 400,
          type: "error",
          message: "Meal Already Added",
          message2: `Meal already added to ${userData[0]?.fullname}`,
        });
      } else {
        const carry = await meals.find({
          user_id: userData[0]._id,
          datetime: req.body.datetime,
        });
        if (carry.length > 0) {
          await meals.updateOne(
            { user_id: userData[0]._id, datetime: req.body.datetime },
            { $set: req.body }
          );
          await user.updateOne(
            { _id: userData[0]._id },
            { $set: { balance: userData[0].balance - 60 } }
          );
          const newBalanceHistory = new balancehistory({user_id:userData[0]._id, amount: "-60", current_amount: parseInt(userData[0].balance) - 60, details: 'payment'});
    await newBalanceHistory.save();
          res.json({
            status: 201,
            type: "info",
            message: "Meal Added",
            message2: `Meal added to ${userData[0]?.fullname}`,
          });
        } else {
          const newMeal = new meals({ ...req.body, user_id: userData[0]._id });
          await newMeal.save();
          await user.updateOne(
            { _id: userData[0]._id },
            { $set: { balance: userData[0].balance - 60 } }
          );
          const newBalanceHistory = new balancehistory({user_id:userData[0]._id, amount: "-60", current_amount: parseInt(userData[0].balance) - 60, details: 'payment'});
    await newBalanceHistory.save();
          res.json({
            status: 200,
            type: "info",
            message: "Meal Added",
            message2: `Meal added to ${userData[0]?.fullname}`,
          });
        }
      }
    } else {
      res.json({
        status: 400,
        type: "error",
        message: "User Not Found",
        message2: `User Not Found`,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: 500, type: "error", message: "", message2: "" });
  }
});

module.exports = router;
