const mongoose = require("mongoose");

const trust_donation = new mongoose.Schema({
    user_name:String,
    date_of_Donation:Date,
    amount_Donated:String,
    trust_unique_no:String

});

const trust_donar = mongoose.model("trust_donation_details", trust_donation);

module.exports = trust_donar;