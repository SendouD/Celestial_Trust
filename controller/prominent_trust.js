const express = require("express");
let prominent_trust = express.Router();
const Mailsender = require("./email_backend");
const donate_middleware = require("../middlewares/verify_login");
const mongoose = require("mongoose");
const review = require("../Models/reviews_schema");
const database_model = require("../Models/Trust_Schema");

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
prominent_trust
  .route("/")
  .get(async(req, res) => {
    const reviews = await review.find({});

    // Create an object to store the total score and count for each trust name
    const trustReviews = {};

    // Iterate through the reviews
    reviews.forEach(review => {
      const trustname = review.trustname.toString(); // Convert trustName to string

      const {review_rating, /* other attributes */ } = review;

      // Check if the trust name already exists in the trustReviews object
      if (trustReviews.hasOwnProperty(trustname)) {
        // If the trust name exists, add the review score to the total score and increase the count by 1
        trustReviews[trustname].totalScore += review_rating;
        trustReviews[trustname].count++;
        // You can include other attributes as needed
        // trustReviews[trustName].otherAttribute += review.otherAttribute;
      } else {
        // If the trust name doesn't exist, initialize it with the current review score
        trustReviews[trustname] = {
          totalScore: review_rating,
          count: 1,
          // You can include other attributes as needed
          // otherAttribute: review.otherAttribute
        };
      }
    });
    const average = {};
    Object.keys(trustReviews).forEach(trustname => {
      const { totalScore, count } = trustReviews[trustname];
      average[trustname] = totalScore / count;
    });

    
    const user = await database_model.find({});
  
    res.render("prominent_trust", {ratings:average,trusts:user});
  });


module.exports = prominent_trust;
