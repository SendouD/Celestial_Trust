const express = require("express");
let route= express.Router();
const user_schema=require("../Models/User_schema");
const user_volunteer=require("../Models/user_volunteer");
const user_donation=require("../Models/user_donation_schema");


route.get("/",async(req,res) => {
    const user=await user_schema.findOne({_id:req.cookies.id});
    const user_d_details= await user_donation.find({user_id:req.cookies.id});
    const user_v_details= await user_volunteer.find({user_id:req.cookies.id});
    let result;
    if(user.isvolunteer){
        result="Yes"
    }else{
        result="No"
    }
    const contri_user={
        name:user.name,
        user_name:user.username,
        phone_no:user.phonenumber,
        volunteer:result
    }
    
    console.log(user_v_details);
    res.render("contribution",{user:contri_user,donated_trusts:user_d_details,volunteer_trusts:user_v_details});
})








module.exports=route;






