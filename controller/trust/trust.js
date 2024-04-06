const route=require("express").Router();
route.get("/",(req,res)=>{
    res.render("trust_login");

})

module.exports=route;
