const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  user_id:{
    type: mongoose.Types.ObjectId,
    ref: "auths",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
