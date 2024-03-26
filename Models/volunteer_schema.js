const mongoose = require('mongoose');


const volunteerDataSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    phone_number: String,
    address: String,
    message: String
});

const volunteerdata = mongoose.model('VolunteerData',volunteerDataSchema);

module.exports=volunteerdata