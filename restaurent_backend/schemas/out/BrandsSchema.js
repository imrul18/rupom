const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  brand_name: {
    type: String,
    required: true,
  },
  brand_details: {
    type: String,
  },
  brand_type: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  company_id: {
    type: mongoose.Types.ObjectId,
    ref: "companies",
    required: true,
  },
  product_id: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema;
