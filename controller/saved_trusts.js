const express = require("express");
let saved_trusts = express.Router();
const savedTrusts = require("../Models/savedTrusts_schema");
const trustInfo = require("../Models/TrustInfo_schema");
const saved_middleware = require("../middlewares/verify_login");

saved_trusts.route('/').all(saved_middleware)
    .get( async (req,res) => {
        let trusts;
        if(req.cookies.id !== undefined) await savedTrusts.find({user:req.cookies.id}).then((data) => trusts = data);
        else await savedTrusts.find({user:'1'}).then((data) => trusts = data);
        res.render('saved_trusts',{trusts : trusts});
    })
    .post( async (req,res) => {
        const { trustId } = req.body;
        let trust_id = trustId;
        await savedTrusts.deleteOne({trust_unique_no : trust_id,user:req.cookies.id});
        return res.status(200).redirect('/');
    });

module.exports = saved_trusts;