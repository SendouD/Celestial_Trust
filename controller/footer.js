const route=require("express").Router();
const mailer=require("./email_backend");
const database=require("../Models/Newsletter_schema");


route.post("/news_letter", async (req, res) => {
    const path = await mailer.newsletter(req.body.news_email);
    console.log("done");
    await database.create({email:req.body.news_email});
  });


  module.exports=route;