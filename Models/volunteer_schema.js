const mongoose = require('mongoose');


const volunteerDataSchema = new mongoose.Schema({
    Trust_name:String,
    full_name: String,
    email: String,
    phone_number: String,
    address: String,
    start_date:Date,
    end_date:Date,
    message: String,
});

const volunteerdata = mongoose.model('VolunteerData',volunteerDataSchema);

module.exports=volunteerdata