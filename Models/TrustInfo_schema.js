const mongoose = require("mongoose");

const TrustInfoSchema = new mongoose.Schema({
    name: String,
    about1: String,
    nameOwner:String,
    about2: String, 
    trust_unique_no: String,
    trust_types: [String],
    signed_url:{type:String,default:"not provided"}
});
const Trust_Info = mongoose.model("TrustInfo", TrustInfoSchema);

module.exports = Trust_Info;