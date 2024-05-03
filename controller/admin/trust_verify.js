const route=require('express').Router();
const t_database=require("../../Models/Trust_Schema");


route.get("/",async(req,res)=>{
    const trusts=await t_database.find({isverified:false});

    res.render("admin_verify",{unverified_trusts:trusts});
})


route.post("/",async(req,res)=>{
    console.log("got in ");
    
    console.log(req.body);
    const updated_trusts=await t_database.updateOne({trust_unique_no:req.body.trust_unique_no},{$set :{isverified:true}});
    console.log(updated_trusts);
    return res.status(200).redirect("/");
})
module.exports=route;