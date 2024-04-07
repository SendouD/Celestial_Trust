const route=require("express").Router();
const trust_data_insert=require("./trust_data");
route.get("/",(req,res)=>{
    res.render("trust_login");

})
route.use('/data',trust_data_insert);



module.exports=route;
