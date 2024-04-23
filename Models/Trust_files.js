const mongoose = require('mongoose');


const trustfiles = new mongoose.Schema({
  
  trust_no:String,
  signed_url:String,

});
const trust_file = mongoose.model('Trustfiles', trustfiles);

module.exports=trust_file;