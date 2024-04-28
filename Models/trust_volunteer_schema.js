const mongoose = require("mongoose");

const trust_volunteer = new mongoose.Schema({
    user_name:String,
    start_date:Date,
    end_date:Date,
    no_of_hours:String,
    trust_unique_no:String
});

const trust_v = mongoose.model("trust_volunteer_info", trust_volunteer);

module.exports = trust_v;