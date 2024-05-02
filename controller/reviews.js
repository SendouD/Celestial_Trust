const express = require('express');
const router = express.Router();
const reviewModel = require('../Models/reviews_schema');

router.get('/', async (req, res) => {
    res.render('reviews');
});


router.route('/').post( async (req, res) => {
    try {
        const review = await reviewModel.create(req.body);
        console.log(review); 
        res.redirect('/');
    } catch (error) {
        console.error(error); 
        res.status(500).send('Internal Server Error'); 
    }
});

module.exports = router;
