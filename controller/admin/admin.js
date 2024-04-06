const route=require("express").Router();
route.get("/",(req,res)=>{
    res.render("admin_login");

})

module.exports=route;