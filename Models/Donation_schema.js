const mongoose = require('mongoose');


const donationSchema = new mongoose.Schema({
  type:String,
  DamageDescription:String,
  itemName:String,
  donationAmount: Number,
  paymentMethod: String,
  name: String,
  email: String,
  phone: String,
  country: String,
  address: String,
  city: String,
  anonymous: Boolean,
  consent: Boolean
});
const Donation = mongoose.model('Donation', donationSchema);

module.exports=Donation