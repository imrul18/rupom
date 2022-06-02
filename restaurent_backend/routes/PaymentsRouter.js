const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PaymentsSchema = require("../schemas/PaymentsSchema");
const payments = new mongoose.model("payments", PaymentsSchema);

const UsersSchema = require("../schemas/UsersSchema");
const user = new mongoose.model("users", UsersSchema);

const BalanceHistorySchema = require("../schemas/BalanceHistorySchema");
const balancehistory = new mongoose.model(
  "balancehistory",
  BalanceHistorySchema
);

router.post("/add", async (req, res) => {
  try {
    const userData = await user.find({ _id: req.body.user_id });
    const newPayment = new payments(req.body);
    await newPayment.save();
    await user.updateOne(
      { _id: userData[0]._id },
      {
        $set: {
          balance: parseInt(userData[0].balance) + parseInt(req.body.amount),
        },
      }
    );
    const newBalanceHistory = new balancehistory({user_id:userData[0]._id, amount:req.body.amount, current_amount: parseInt(userData[0].balance) + parseInt(req.body.amount), details: 'payment'});
    await newBalanceHistory.save();
    res.json({
      status: 201,
      type: "info",
      message: "Payment Added",
      message2: `Payment added to ${userData[0]?.fullname} tk ${req.body.amount}`,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, type: "error", message: "A", message2: "" });
  }
});

module.exports = router;
