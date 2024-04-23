const express = require("express");
let saved_trusts = express.Router();
const savedTrusts = require("../Models/savedTrusts_schema");

saved_trusts.route('/')
    .get( async (req,res) => {
        let trusts;
        await savedTrusts.find({}).then((data) => trusts = data);
        res.render('saved_trusts',{trusts : trusts});
    })
    .post( async (req,res) => {
        const { trustId } = req.body;
        let trust_id = trustId;
        await savedTrusts.deleteOne({trust_unique_no : trust_id});
        return res.status(200).redirect('/');
    });

module.exports = saved_trusts;