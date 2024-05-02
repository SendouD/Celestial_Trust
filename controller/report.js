const express = require('express');
const router = express.Router();
const reportModel = require('../Models/report_schema');
const mail=require('./email_backend');
router.get('/', async (req, res) => {
    res.render('report');
});


router.route('/').post( async (req, res) => {
    try {
        const report = await reportModel.create(req.body);
        console.log(report); 
        mail.router(req.body.report_email);
        console.log(req.body.report_email);
        res.redirect('/');
    } catch (error) {
        console.error(error); 
        res.status(500).send('Internal Server Error'); 
    }
});

module.exports = router;
