const express = require("express");
let reported_trusts = express.Router();
const report = require('../Models/report_schema');
const reportcountModel = require('../Models/reportcount_schema');
const trustDetails = require("../Models/Trust_Schema");

reported_trusts.route('/')
    .get(async(req,res) => {
        if(req.cookies.role === 'admin'){
            let temp;
            let trusts = [];
            await reportcountModel.find({no_of_reports: {$gte: 1}}).then((data) => temp = data);
            for(let i=0; i < temp.length; i++){
                await trustDetails.findOne({trust_unique_no: temp[i].trust_id}).then((data) => trusts.push(data));
            }
            res.render('verify_reports',{ trusts: trusts });
        }
        else{
            res.send('You are not authorized to visit this page.');
        }
    })
    .post(async(req,res) => {
        const { trustid,flag } = req.body;
        if(flag === 1){
            console.log(trustid);
            await reportcountModel.findOneAndUpdate({trust_id: trustid},{no_of_reports: 0});
            await report.deleteMany({trust_id: trustid});
        }
        else if(flag === 2){
            await reportcountModel.findOneAndUpdate({trust_id: trustid},{no_of_reports: 0});
            await report.deleteMany({trust_id: trustid});
        }
        return res.status(200).redirect('/');
    })

module.exports = reported_trusts;