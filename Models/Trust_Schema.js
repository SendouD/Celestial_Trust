const mongoose = require("mongoose");

const TrustSchema = new mongoose.Schema({
  name: String,
  state:String,
  email: String,
  phonenumber: Number,
  trust_unique_no:String,
  password: String,
  address: { type: String, default: "Add Address" },
  contri_received: { type: Number, default: 0 },
  Date_Joined:{type:Date,default:new Date()}
});

const Trust_Details = mongoose.model("Trust", TrustSchema);

module.exports = Trust_Details;
