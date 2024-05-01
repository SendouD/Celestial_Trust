const mongoose = require('mongoose');
const reviewSchema=new mongoose.Schema({
    trustname:String,
    review_name:String,
    review_rating:Number,
    review_comment:String,
});

const review=mongoose.model('review',reviewSchema);
module.exports=review;