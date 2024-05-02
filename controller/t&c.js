const express = require('express');
const router=express.Router();

router.route('/').get(async(req,res)=>{
    res.render('t&c');
});

module.exports=router;