const express = require("express");
let reported_trusts = express.Router();
const reportcountModel = require('../Models/reportcount_schema');
const trustDetails = require("../Models/Trust_Schema");

reported_trusts.route('/')
    .get(async(req,res) => {
        if(req.cookies.role === 'admin'){
            let temp;
            let trusts = [];
            await reportcountModel.find({no_of_reports: {$gte: 2}}).then((data) => temp = data);
            for(let i=0; i < temp.length; i++){
                await trustDetails.findOne({name: temp[i].trust_name}).then((data) => trusts.push(data));
            }
            res.render('verify_reports',{ trusts: trusts });
        }
        else{
            res.send('You are not authorized to visit this page.');
        }
    })

module.exports = reported_trusts;