const express = require("express");
let t_info = express.Router();
const mongoose = require("mongoose");
const trustInfo = require("../Models/TrustInfo_schema");
var trusts;
let type1 = 'All';
let page_no = 1,flag1=0; 
let name2 = "Elder"

t_info.route("/")
    .get(async(req,res) => {
        let str = '';
        let length;
        try {
            if(flag1 === 1)
                await trustInfo.find({name : {$regex : name2}}).then((data) => trusts = data);
            else if(type1 === 'All')
                await trustInfo.find({}).then((data) => trusts = data);
            else
                await trustInfo.find({trust_types : { $in: [type1] }}).then((data) => trusts = data);
            if(trusts.length === 0){
                await trustInfo.find({}).then((data) => trusts = data); 
                console.log("No trusts found!");
            }
            length = trusts.length;
            for(let i=1;i<(length/4)+1;i++) str = str + '<div class="t-hy hyp'+i+'">'+i+'</div>';
            res.render("trustOne",{ trust1 : trusts[(4*(page_no-1))%length] , trust2 : trusts[(1+4*(page_no-1))%length] , trust3 : trusts[(4*(page_no-1)+2)%length] , trust4 : trusts[(4*(page_no-1)+3)%length] , hyperlinks : str});
        } catch (error) {
            console.log(error);
        }
    })

t_info.route("/")
    .post( (req, res) => {
        const { type,num,name1,flag } = req.body;
        if(flag === 0) { type1 = type; page_no = 1; }
        else if(flag === 1){
            if(num === 'Prev') { if(page_no > 1) page_no--; }
            else if(num === 'Next') { if(page_no < (trusts.length/4)) page_no++; }
            else page_no = Number(num);
        }
        else if(flag === 2) { flag1 = 1; name2 = name1; page_no = 1; }
        return res.status(200).redirect('/');
    });

t_info.route("/:id")
    .get(async (req,res) => {
        let trust;
        let trustId = req.params.id;
        await trustInfo.find({trust_unique_no : trustId}).then((data) => trust = data);
        console.log(trust);
        res.render("trustTwo", {trust : trust[0]});
    });

module.exports = t_info;