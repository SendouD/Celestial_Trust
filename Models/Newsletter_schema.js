const mongoose = require('mongoose');


const newsletterSchema = new mongoose.Schema({

  email: String

});
const newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports=newsletter