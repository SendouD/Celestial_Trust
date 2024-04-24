const mongoose = require("mongoose");

const user_volunteer = new mongoose.Schema({
    trust_id:String,
    trust_name:String,
    start_date:Date,
    end_date:Date,
    no_of_hours:String,
    user_id:String
});

const user_v = mongoose.model("user_volunteer_info", user_volunteer);

module.exports = user_v;