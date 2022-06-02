const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  breakfast: {
    type: Number,
  },
  lunch: {
    type: Number,
  },
  dinner: {
    type: Number,
  },
  datetime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
