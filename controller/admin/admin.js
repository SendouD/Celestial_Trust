const route = require("express").Router();
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jsonwebtoken_verification = require("../jwt_verification");
const mailer=require("../email_backend");
route.use(cookie());
const database=require("../../Models/Newsletter_schema");
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

route.get("/news_letter",async (req,res)=>{
  res.render("admin_newsletter");
})

route.post("/news_letter",async(req,res)=>{
  console.log(req.body);
  const users=await database.find({});
  console.log(users);
  
  if(user.length!=0){
    const p=new Promise((resolve,reject) =>{
      users.forEach(async(user)=>{
        console.log(user.email);
        await mailer.weekly_newsletter(user.email,req.body.week_no,req.body.sub,req.body.text);
        
      })
      resolve(true);
    })

  }
  res.render("admin_index");
})
module.exports = route;
