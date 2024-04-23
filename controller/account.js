const express = require("express");
const route = express.Router();
const ejs = require("ejs");
const verify = require("../middlewares/verify_login");
const database_model = require("../Models/User_schema");
const cookie = require("cookie-parser");
route.use(cookie());

route.get("/", verify, async (req, res) => {
  const details = await database_model.findOne({ _id: req.cookies.id });
  const newuser = {
    name: details.name,
    user_name: details.username,
    phone_no: details.phonenumber,
    state: details.state,
    contri_num: details.contri_num,
    email: details.email,
    address: details.address,
  };
  
  res.render("account", { user: newuser });
});
route.post("/",async(req, res)=>{
  const user = await database_model.findOne({ _id: req.cookies.id });
  const changes_data={
    name: req.body.name,
    username:req.body.username,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    password:user.password,
    state:req.body.state,
    address:req.body.address,
    contri_num:req.body.contri_num,
    
  }
  res.clearCookie('id');
  await database_model.deleteOne({ _id: user._id });
  const resl= await database_model.create(changes_data);
  res.cookie("id", resl._id, { maxAge: 7 * 24 * 60 * 60 * 1000 });
  return res.status(200).redirect("/");

})
module.exports = route;
