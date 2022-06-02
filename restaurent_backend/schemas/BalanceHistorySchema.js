const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  details: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  current_amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
