const express = require("express");
let saved_trusts = express.Router();
const savedTrusts = require("../Models/savedTrusts_schema");
const trustInfo = require("../Models/TrustInfo_schema");
const saved_middleware = require("../middlewares/verify_login");

saved_trusts.route('/').all(saved_middleware)
    .get( async (req,res) => {
        let trusts;
        let t_url=[];
        if(req.cookies.id !== undefined) await savedTrusts.find({user:req.cookies.id}).then((data) => trusts = data);
        else await savedTrusts.find({user:'1'}).then((data) => trusts = data);
        for(let i=0; i<trusts.length; i++){
            await trustInfo.findOne({trust_unique_no : trusts[i].trust_unique_no}).then((data) => t_url.push(data.signed_url));
        }
        res.render('saved_trusts',{trusts : trusts, t_url : t_url});
    })
    .post( async (req,res) => {
        const { trustId } = req.body;
        let trust_id = trustId;
        await savedTrusts.deleteOne({trust_unique_no : trust_id,user:req.cookies.id});
        return res.status(200).redirect('/');
    });

module.exports = saved_trusts;