const express = require("express");
let donate = express.Router();
const Mailsender = require("./email_backend");
const donate_middleware = require("../middlewares/verify_login");
const mongoose = require("mongoose");
const Donation = require("../Models/Donation_schema");

// const donationSchema = new mongoose.Schema({
//   donationAmount: Number,
//   paymentMethod: String,
//   name: String,
//   email: String,
//   phone: String,
//   country: String,
//   address: String,
//   city: String,
//   anonymous: Boolean,
//   consent: Boolean
// });
// const Donation = mongoose.model('Donation', donationSchema);
donate
  .route("/")
  .all(donate_middleware)
  .get((req, res) => {
    res.render("donation");
  });
donate.route("/").post(async (req, res) => {
  console.log("hii");
  console.log(req);
  const newDonation = new Donation({
    
    donationAmount: req.body.donationAmount,
    paymentMethod: req.body.paymentMethod,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    address: req.body.address,
    city: req.body.city,
    anonymous: req.body.anonymous === "on",
    consent: req.body.consent === "on",
  });

  try {
    const savedDonation = await newDonation.save();
    Mailsender.donation_success(savedDonation.email, savedDonation.donationAmount);
    console.log("success");
    res.status(200).redirect("confirmation");
  } catch (error) {
    console.error(error);
    console.log("error");
    res.status(500).send("Error saving donation");
  }
});
module.exports = donate;
