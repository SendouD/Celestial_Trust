const database=require("../Models/Trust_Schema");
const trust_check=async(req,res,next)=>{
    console.log(req.body);
    const existing_trust = await database.findOne({  email:req.body.email });
    console.log(existing_trust);

    if (existing_trust) {
         res.send("Trust Email already exists");
      }else{
        next();
      }
}

module.exports=
    trust_check

