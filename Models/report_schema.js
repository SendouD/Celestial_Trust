const mongoose = require('mongoose');
const reportSchema=new mongoose.Schema({
    trustname:String,
    report_name:String,
    report_email:String,
    report_comment:String,
});

const report=mongoose.model('report',reportSchema);
module.exports=report;
