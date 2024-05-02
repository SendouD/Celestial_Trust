const express = require('express');
const router = express.Router();
const report = require('../Models/report_schema');
const reportcountModel = require('../Models/reportcount_schema');
const saved_middleware = require("../middlewares/verify_login");

router.route('/').all(saved_middleware)
    .get(async (req, res) => {
        res.render('report');
    })
    .post( async (req, res) => {
        try {
            const report1 = new report({
                user_id: req.cookies.id,
                trustname:req.body.trustname,
                report_name:req.body.report_name,
                report_email:req.body.report_email,
                report_comment:req.body.report_comment,
            });
            if(await report.findOne({trustname: req.body.trustname,user_id: req.cookies.id})){console.log("cant report same trust twice");}
            else{
                await report1.save();

                let temp;

                await reportcountModel.find({trust_name: req.body.trustname}).then((data) => temp = data);

                if(temp.length === 0){
                    const reportcount = new reportcountModel({
                        trust_name: req.body.trustname,
                        no_of_reports: 1,
                    });
                    reportcount.save();
                }
                else {
                    await reportcountModel.findOneAndUpdate(temp[0],{trust_name: temp[0].trust_name,no_of_reports: temp[0].no_of_reports+1});
                }
            }
            res.redirect('/');
        } catch (error) {
            console.error(error); 
            res.status(500).send('Internal Server Error');
        }
    });

module.exports = router;
