const express = require('express');
const router = express.Router();
const report = require('../Models/report_schema');
const reportcountModel = require('../Models/reportcount_schema');
const trustDetails = require("../Models/Trust_Schema");
const saved_middleware = require("../middlewares/verify_login");

router.route('/:id').all(saved_middleware)
    .get(async (req, res) => {
        const data=await trustDetails.findOne({trust_unique_no:req.params.id});
        res.render('report',{name:data});
    })
    .post( async (req, res) => {
        try {
            let trust_id;
            await trustDetails.findOne({name: req.body.trustname}).then((data) => trust_id = data.trust_unique_no);
            const report1 = new report({
                user_id: req.cookies.id,
                trust_id: trust_id,
                trustname:req.body.trustname,
                report_name:req.body.report_name,
                report_email:req.body.report_email,
                report_comment:req.body.report_comment,
            });
            if(await report.findOne({trustname: req.body.trustname,user_id: req.cookies.id})){console.log("cant report same trust twice");}
            else{
                await report1.save();

                let temp;

                await reportcountModel.find({trust_id: trust_id}).then((data) => temp = data);

                if(temp.length === 0){
                    const reportcount = new reportcountModel({
                        trust_id: trust_id,
                        no_of_reports: 1,
                    });
                    reportcount.save();
                }
                else {
                    await reportcountModel.findOneAndUpdate(temp[0],{trust_id:trust_id,no_of_reports: temp[0].no_of_reports+1});
                }
            }
            res.redirect('/');
        } catch (error) {
            console.error(error); 
            res.status(500).send('Internal Server Error');
        }
    });

module.exports = router;
