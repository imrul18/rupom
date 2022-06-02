const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UsersSchema = require("../schemas/UsersSchema");
const user = new mongoose.model("users", UsersSchema);

const MealsSchema = require("../schemas/MealsSchema");
const meals = new mongoose.model("meals", MealsSchema);

const PaymentsSchema = require("../schemas/PaymentsSchema");
const payments = new mongoose.model("payments", PaymentsSchema);

const BalanceHistorySchema = require("../schemas/BalanceHistorySchema");
const balancehistory = new mongoose.model(
  "balancehistory",
  BalanceHistorySchema
);

router.get("/getbyid/:userid", async (req, res) => {
  try {
    const userData = await user.find({ _id: req.params.userid });
    if (userData.length > 0) {
      let mealsData = await meals.find({ user_id: userData[0]._id });
      let paymentsData = await payments.find({ user_id: userData[0]._id });
      let balancehistoryData = await balancehistory.find({ user_id: userData[0]._id });
      res.json({
        status: 200,
        type: "success",
        message: "",
        data: { userData: userData, meals: mealsData, payments: paymentsData, balancehistory:balancehistoryData },
      });
    } else {
      res.json({
        status: 205,
        type: "error",
        message: "User not found",
        message2: "Please Scan a valid QR code...",
      });
    }
  } catch (err) {
    res.json({
      status: 205,
      type: "error",
      message: "Invalid QR code...",
      message2: "Please Scan a valid QR code...",
    });
  }
});

router.get("/getbyusername/:username", async (req, res) => {
  try {
    const userData = await user.find({ username: req.params.username });
    if (userData.length > 0) {
      let mealsData = await meals.find({ user_id: userData[0]._id });
      let paymentsData = await payments.find({ user_id: userData[0]._id });
      res.json({
        status: 200,
        type: "success",
        message: "",
        data: { userData: userData, meals: mealsData, payments: paymentsData },
      });
    } else {
      res.json({
        status: 205,
        type: "error",
        message: "User not found",
        message2: "Please give a valid username...",
      });
    }
  } catch (err) {
    res.json({
      status: 205,
      type: "error",
      message: "",
      message2: "Invalid Username...",
    });
  }
});

module.exports = router;
