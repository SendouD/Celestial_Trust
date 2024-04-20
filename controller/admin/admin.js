const route = require("express").Router();
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jsonwebtoken_verification = require("../jwt_verification");
route.use(cookie());
const admin_verify = require("../../data/admin_data.json");
route.get("/", (req, res) => {
  res.render("admin_login");
});

route.post("/", (req, res) => {
  if (
    admin_verify.admin.includes(req.body.email) &&
    req.body.pswd === admin_verify.pass
  ) {
    res.cookie("cookie", jsonwebtoken_verification.setuser(req.body.email), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("id",req.body.email , { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie("role","admin", { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.redirect("/");
  }
});
module.exports = route;
