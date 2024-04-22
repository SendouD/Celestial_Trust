const confirmation=require("express").Router();

confirmation.route("/").get((req,res)=>{
    res.render("confirmation");

})




module.exports=confirmation;
