const mongoose = require('mongoose');
const reportSchema=new mongoose.Schema({
    trust_name: String,
    no_of_reports: Number,
});

const reportcountModel=mongoose.model('reportcount',reportSchema);
module.exports=reportcountModel;
