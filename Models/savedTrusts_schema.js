const mongoose = require('mongoose');

const savedtrustsSchema = new mongoose.Schema({
    name: String,
    trust_type: [String],
    email: String,
    phone_no: String,
    address : String,
    trust_unique_no : String,
  });
const savedtrusts = mongoose.model('Savedtrusts', savedtrustsSchema);

module.exports = savedtrusts;  