const t_database=require("../Models/Trust_Schema");
const  check=async (req,res,next)=>{
    let isverified;
    const details=await t_database.findOne({_id:req.cookies.id});
    if(details.isverified){
        next();
    }else{
        res.redirect("/");
    }

}
module.exports=check;