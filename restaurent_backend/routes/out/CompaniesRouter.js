const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CompaniesSchema = require("../schemas/CompaniesSchema");
const companies = new mongoose.model("companies", CompaniesSchema);

router.get("/getall", async (req, res) => {
  try {
    const company = await companies.find();
    res.status(200).json({ message: "Successfull", data: company });
  } catch (err) {
    res.status(500).json({ error: "Error", err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const company = await companies.find({
      company_name: req.body.company_name,
    });
    if (company && company.length > 0) {
      res.status(500).json({
        error: "company Taken!!!",
        message: "already added",
      });
    } else {
      const newCompany = new companies(req.body);
      await newCompany.save();
      res.status(200).json({ message: "Successfull added Brand" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error", err });
  }
});

router.post("/update", async (req, res) => {
  try {
    await brands.updateOne({ _id: req.body.brand_id }, { $set: req.body });
    res.status(200).json({ message: "Successfull update Brand" });
  } catch (err) {
    res.status(500).json({ error: "Error", err });
  }
});

router.post("/delete", async (req, res) => {
  try {
    await brands.updateOne(
      { _id: req.body.brand_id },
      { $set: { status: "inactive" } }
    );
    res.status(200).json({ message: "Successfull deleted Brand" });
  } catch (err) {
    res.status(500).json({ error: "Error", err });
  }
});

module.exports = router;
