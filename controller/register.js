const express = require("express");
let register = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User_schema");
const cookie = require("cookie-parser");
const jsonwebtoken_verification = require("./jwt_verification");
register.use(cookie());


function validatePassword(password) {
  return /^\S{8,}$/.test(password);
}


function validateName(name) {
  return /^[a-zA-Z]+$/.test(name);
}



  

register.route("/").post(async (req, res) => {
    if (!validatePassword(req.body.newpassword)) {
      console.log("newpass");
    return res.status(400).send("Password must contain at least one letter, one number, one special character, and be at least 8 characters long.");
  }
  
  if (!validateName(req.body.name)) {
    console.log("name ");
    return res.status(400).send("Name should contain only letters.");
  }

  if (!validateName(req.body.username)) {
    console.log("username");
    return res.status(400).send("Username should contain only letters.");
  }
  
  
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    // If the email already exists, send a response indicating the conflict
    return res.status(409).send("Email already exists");
  }
  
  const hashedpassword = await bcrypt.hash(req.body.newpassword, 10);
  const newUser = new User({
    name:req.body.name,
    username: req.body.username,
    email: req.body.email,
    phonenumber: req.body.phno,
    password: hashedpassword,
  });
  try {
    console.log(newUser);
    const newuserdetail = await newUser.save();
    res.cookie("cookie", jsonwebtoken_verification.setuser(newuserdetail), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("id", newUser._id, { maxAge: 7 * 24 * 60 * 60 * 1000 });

     return res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = register;
