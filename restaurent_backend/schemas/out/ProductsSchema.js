const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  product_tag: {
    type: String,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_details: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  brand_id: {
    type: mongoose.Types.ObjectId,
    ref: "brands",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
