const express = require("express");
const route = express.Router();
const ejs = require("ejs");
const verify = require("../middlewares/verify_login");
const database_model = require("../Models/User_schema");

route.get("/", verify, async (req, res) => {
  const details = await database_model.findOne({ _id: req.cookies.id });
  const newuser = {
    name: details.username,
    user_name: details.username,
    phone_no: details.phonenumber,
    state: details.state,
    contri_num: details.contri_num,
    email: details.email,
    address: details.address,
  };

  res.render("account", { user: newuser });
});
module.exports = route;
