const express = require("express");
let reported_trusts = express.Router();

reported_trusts.route('/')
    .get(async(req,res) => {
        if(req.cookies.role === 'admin'){
            res.render('verify_reports');
        }
        else{
            res.send('You are not authorized to visit this page.');
        }
    })

module.exports = reported_trusts;