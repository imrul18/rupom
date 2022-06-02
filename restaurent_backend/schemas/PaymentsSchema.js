const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },

  amount: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
