const mongoose = require("mongoose");

const TrustInfoSchema = new mongoose.Schema({
    name: String,
    about1: String,
    about2: String, 
    trust_unique_no:String,
    trust_type: String,
});

const Trust_Info = mongoose.model("TrustInfo", TrustInfoSchema);

module.exports = Trust_Info;
