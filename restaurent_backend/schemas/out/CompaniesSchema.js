const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_details: {
    type: String,
  },
  company_type: {
    type: String,
  },
  owner_id: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  brand_id: [
    {
      type: mongoose.Types.ObjectId,
      ref: "brands",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
