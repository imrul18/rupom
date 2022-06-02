const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UsersSchema = require("../schemas/UsersSchema");
const users = new mongoose.model("users", UsersSchema);

router.get("/getall", async (req, res) => {
  try {
    const user = await users.find();
    res.json({ status: 200, type: "success", message: "", data: user });
  } catch (err) {
    res.json({ status: 500, type: "error", message: "", message2: "" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newPayment = new payments(req.body);
      await newPayment.save();
      res.json({ status: 200, type: "success", message: "", data: "" });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, type: "error", message: "A", message2: "" });
  }
});

module.exports = router;
