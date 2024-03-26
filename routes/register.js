const express=require("express");
let register= express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    phonenumber: Number,
    password: String
  });
  
const User = mongoose.model('User', usersSchema);


register.route('/').post(async (req, res) => {


    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // If the email already exists, send a response indicating the conflict
      return res.status(409).send('Email already exists');
    }
   const hashedpassword=await bcrypt.hash(req.body.newpassword,10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phonenumber: req.body.phno,
      password: hashedpassword
    });
    try {
      console.log(newUser);
      const newuserdetail = await newUser.save();
      return res.status(200).send();
    } catch (err) {
      console.log(err);
    }
  });

module.exports={register,User}