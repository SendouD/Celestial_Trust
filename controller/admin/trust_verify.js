const route=require('express').Router();
const t_database=require("../../Models/Trust_Schema");


route.get("/",async(req,res)=>{
    const trusts=await t_database.find({isverified:false});

    console.log(trusts);
    res.render("admin_verify",{unverified_trusts:trusts});
})


route.post("/",async(req,res)=>{
    const {trust_id}=req.body;
    console.log(req.body);
    const updated_trusts=await t_database.updateMany({trust_id,isverified:false},{$set :{isverified:true}});
    return res.status(200);
})
module.exports=route;