const express = require("express");
let route = express.Router();
const user_schema = require("../Models/User_schema");
const user_volunteer = require("../Models/user_volunteer");
const user_donation = require("../Models/user_donation_schema");
const trust_details = require("../Models/Trust_Schema");
const trust_volunteer = require("../Models/trust_volunteer_schema");
const trust_donation = require("../Models/trust_donation_schema");
const pdf_generation=require("./pdf_production");
const path=require("path");


route.get("/", async (req, res) => {
    const user = await user_schema.findOne({ _id: req.cookies.id });
    const user_d_details = await user_donation.find({ user_id: req.cookies.id });
    const user_v_details = await user_volunteer.find({ user_id: req.cookies.id });
    let result;
    if (user.isvolunteer) {
        result = "Yes"
    } else {
        result = "No"
    }
    const contri_user = {
        name: user.name,
        user_name: user.username,
        phone_no: user.phonenumber,
        volunteer: result
    }

    res.render("contribution", { user: contri_user, donated_trusts: user_d_details, volunteer_trusts: user_v_details });
})

route.get("/trust", async (req, res) => {
    const user = await trust_details.findOne({ _id: req.cookies.id });
    const trust_d_details = await trust_donation.find({ trust_unique_no: user.trust_unique_no });
    const trust_v_details = await trust_volunteer.find({ trust_unique_no: user.trust_unique_no });

    const contri_user = {
        name: user.name,
        user_name: user.username,
        phone_no: user.email,
        state: user.state,
        trust_unique_no: user.trust_unique_no,
        contri_received: user.contri_received


    }

    res.render("trust_contribution", { trust: contri_user, user_donations: trust_d_details, user_volunteerings: trust_v_details });
})

route.post("/donation-date-wise", async (req, res) => {
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);
    console.log(start_date);
    const donated_users = await user_donation.find(
        {
            user_id: req.cookies.id,
            date_of_Donation: {
                $gte: start_date,
                $lte: end_date
            }
        }
    );
    const user = await user_schema.findOne({ _id: req.cookies.id });
    const user_v_details = await user_volunteer.find({ user_id: req.cookies.id });
    let result;
    if (user.isvolunteer) {
        result = "Yes"
    } else {
        result = "No"
    }
    const contri_user = {
        name: user.name,
        user_name: user.username,
        phone_no: user.phonenumber,
        volunteer: result
    }
    res.render("contribution", { user: contri_user, donated_trusts: donated_users, volunteer_trusts: user_v_details });

})


route.post("/volunteer-date-wise", async (req, res) => {
    const user_d_details = await user_donation.find({ user_id: req.cookies.id });

    const user = await user_schema.findOne({ _id: req.cookies.id });
    const user_v_details = await user_volunteer.find(
        {
            user_id: req.cookies.id,
            start_date: {
                $gte: new Date(req.body.start_date),
                $lte: new Date(req.body.end_date)
            }
        }
    );
    let result;
    if (user.isvolunteer) {
        result = "Yes"
    } else {
        result = "No"
    }
    const contri_user = {
        name: user.name,
        user_name: user.username,
        phone_no: user.phonenumber,
        volunteer: result
    }
    res.render("contribution", { user: contri_user, donated_trusts: user_d_details, volunteer_trusts: user_v_details });

})

route.post("/trust/donation-date-wise", async (req, res) => {
    console.log(new Date(req.body.start_date));
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);
    const user = await trust_details.findOne({ _id: req.cookies.id });
    const trust_d_details = await trust_donation.find(
        {
            trust_unique_no: user.trust_unique_no,
            date_of_Donation: {
                $gte: start_date,
                $lte: end_date
            }
        }
    );

    const trust_v_details = await trust_volunteer.find({ trust_unique_no: user.trust_unique_no });

    const contri_user = {
        name: user.name,
        user_name: user.username,
        phone_no: user.email,
        state: user.state,
        trust_unique_no: user.trust_unique_no,
        contri_received: user.contri_received


    }
    console.log(trust_d_details);

    res.render("trust_contribution", { trust: contri_user, user_donations: trust_d_details, user_volunteerings: trust_v_details });


});

route.post("/trust",async (req,res) =>{
    console.log(req.body);  
    const path_to_certificate=path.join(__dirname,"/../certificates");
    console.log(path_to_certificate);
    await pdf_generation.generatePDF(req.body.user_name,path_to_certificate);
    console.log("PDF CREATED");
})
route.post("/trust/volunteer-date-wise", async (req, res) => {
    const user = await trust_details.findOne({ _id: req.cookies.id });
    const trust_d_details = await trust_donation.find({ trust_unique_no: user.trust_unique_no });
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);
    const trust_v_details = await trust_volunteer.find(
        {
            trust_unique_no: user.trust_unique_no,
            start_date: {
                $gte: start_date,
                $lte: end_date
            }
        }
    );

    const contri_user = {
        name: user.name,
        user_name: user.username,
        phone_no: user.email,
        state: user.state,
        trust_unique_no: user.trust_unique_no,
        contri_received: user.contri_received


    }
    console.log(trust_v_details);

    res.render("trust_contribution", { trust: contri_user, user_donations: trust_d_details, user_volunteerings: trust_v_details });

})










module.exports = route;






