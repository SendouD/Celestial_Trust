const express = require("express");
let prominent_trust = express.Router();
const Mailsender = require("./email_backend");
const donate_middleware = require("../middlewares/verify_login");
const mongoose = require("mongoose");
const review = require("../Models/reviews_schema");
const database_model = require("../Models/Trust_Schema");

prominent_trust
  .route("/")
  .get(async (req, res) => {
    const reviews = await review.find({});

  
    const trustReviews = {};

    reviews.forEach(review => {
      const trustname = review.trustname.toString(); 

      const { review_rating, } = review;


      if (trustReviews.hasOwnProperty(trustname)) {

        trustReviews[trustname].totalScore += review_rating;
        trustReviews[trustname].count++;

      } else {

        trustReviews[trustname] = {
          totalScore: review_rating,
          count: 1,

        };
      }
    });
    const average = {};
    Object.keys(trustReviews).forEach(trustname => {
      const { totalScore, count } = trustReviews[trustname];
      average[trustname] = totalScore / count;
    });


    const user = await database_model.find({});

    res.render("prominent_trust", { ratings: average, trusts: user });
  });


module.exports = prominent_trust;
