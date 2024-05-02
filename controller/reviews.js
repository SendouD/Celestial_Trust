const express = require('express');
const router = express.Router();
const reviewModel = require('../Models/reviews_schema');
const trust=require("../Models/Trust_Schema");

let message='',flag = 0;

router.get('/:id', async (req, res) => {
    const tname=await trust.findOne({trust_unique_no:req.params.id});
    res.render('reviews',{message:message,flag: flag,name:tname.name});
    message='';
});


router.route('/').post(async (req, res) => {
    console.log('inside post');
    try {
        const data = {
            unique_id: req.body.trustname.concat(req.cookies.id),
            trustname: req.body.trustname,
            review_name: req.body.review_name,
            review_rating: req.body.review_rating,
            review_comment: req.body.review_comment,

        }
     
        if (await reviewModel.findOne({ unique_id: data.unique_id })) {
            console.log("you have already reviewed");
            message = 'you have already reviewed the trust!';
            flag = 0;
            return res.status(400).redirect("/");
        }
        else {
            const review = await reviewModel.create(data);
            console.log(review);
            message = 'Your review has been received sucessfully!';
            flag = 1;
            return res.status(200).redirect("/");
        }


    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
