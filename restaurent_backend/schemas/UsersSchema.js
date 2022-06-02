const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  imagelink: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  details: {
    type: String,
  },
  balance: {
    type: String,
    default: "0",
  },
  status:{
    type: String,
    default: "active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
