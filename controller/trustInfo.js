const express = require("express");
let t_info = express.Router();
const mongoose = require("mongoose");
const trustInfo = require("../Models/TrustInfo_schema");
const trustDetails = require("../Models/Trust_Schema");
const donate_middleware = require("../middlewares/verify_login");
const Donation = require("../Models/Donation_schema");
const savedTrusts = require("../Models/savedTrusts_schema");

const review = require("../Models/reviews_schema");

var trusts;
let type1 = 'All';
let page_no = 1,flag1=0,flag2 = 0; 
let name2 = "Elder"
let trust_id;

t_info.route("/")
    .get(async(req,res) => {
        let str = '';
        let length;
        try {
            if(flag2 === 1){
                let trusts1;
                await savedTrusts.find({trust_unique_no : trust_id}).then((data) => trusts = data);
                if(trusts.length === 0){
                    await trustInfo.find({trust_unique_no : trust_id}).then((data) => trusts = data);
                    await trustDetails.find({trust_unique_no : trust_id}).then((data) => trusts1 = data);
                    const newTrust = new savedTrusts({
                        name: trusts[0].name,
                        trust_type: trusts[0].trust_types,
                        email: trusts1[0].email,
                        phone_no: trusts1[0].phonenumber,
                        address: trusts1[0].address,
                        trust_unique_no: trust_id,
                      });
                      newTrust.save();
                }
                flag2 = 0;
            }
            if(flag1 === 1)
                await trustInfo.find({name : {$regex : name2}}).then((data) => trusts = data);
            else if(type1 === 'All'){
                await trustInfo.find({}).then((data) => trusts = data);
            }   
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
    .post( (req, res) => {
        const { type,num,name1,trustId1,flag } = req.body;
        if(flag === 0) { type1 = type; page_no = 1; }
        else if(flag === 1){
            if(num === 'Prev') { if(page_no > 1) page_no--; }
            else if(num === 'Next') { if(page_no < (trusts.length/4)) page_no++; }
            else page_no = Number(num);
        }
        else if(flag === 2) { flag1 = 1; name2 = name1; page_no = 1; }
        else if(flag === 3) {
            flag2 = 1;
            trust_id = trustId1;
        }
        return res.status(200).redirect('/trustInfo');
    });

t_info.route("/:id")
    .get(async (req,res) => {
        let trust;
        let trustId = req.params.id;
        let userreview;
        await trustInfo.find({trust_unique_no : trustId}).then((data) => trust = data);
        console.log(trust);
        try{
            await review.find({trustname :trust[0].name}).then((data) => userreview = data);
            console.log(userreview);
        }
        catch(e){
            console.log('second run');
        }
        // const userreview=await review.find({});
        res.render("trustTwo", {trust : trust[0],trustId : trustId ,jone:userreview});
    })
    .post( (req, res) => {
        let trustId = req.params.id;
        res.redirect("/trustInfo/"+trustId+"/volunteer");
    });

t_info.route("/:id/donate")
  .all(donate_middleware)
  .get((req, res) => {
    res.render("donation");
  })
  .post(async (req, res) => {
    console.log("hii");
    console.log(req.body);
    const newDonation = new Donation({
        donationAmount: req.body.donationAmount,
        paymentMethod: req.body.paymentMethod,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        address: req.body.address,
        city: req.body.city,
        anonymous: req.body.anonymous === "on",
        consent: req.body.consent === "on",
    });

    try {
        const savedDonation = await newDonation.save();
        Mailsender.success(savedDonation.email, savedDonation.donationAmount);
        console.log("success");
        res.status(200).redirect("confirmation.html");
    } catch (error) {
        console.error(error);
        console.log("error");
        res.status(500).send("Error saving donation");
    }
    });

module.exports = t_info;