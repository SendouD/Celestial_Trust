const mongoose = require("mongoose");

const user_donation = new mongoose.Schema({
    trust_id:String,
    trust_name:String,
    date_of_Donation:String,
    amount_Donated:String,
    user_id:String

});

const user_donar = mongoose.model("user_donation_details", user_donation);

module.exports = user_donar;