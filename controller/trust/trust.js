const route = require("express").Router();
const trust_data_insert = require("./trust_data");
const database_model = require("../../Models/Trust_Schema");
const trust_info = require("../../Models/TrustInfo_schema");
const volunteerdata=require("../../Models/volunteer_schema")
const mail=require('../email_backend');
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const { s3uploadV2, getobjecturl } = require('../aws_file_upload');

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 1000000000 },
});
route.get("/", (req, res) => {
    res.render("trust_login");

})
route.use('/data', trust_data_insert);

function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract date, month, and year
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    // Construct formatted date string
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}


route.get("/account", async (req, res) => {
    const details = await database_model.findOne({ _id: req.cookies.id });
    const newuser = {
        name: details.name,
        state: details.state,
        email: details.email,
        phonenumber: details.phonenumber,
        trust_unique_no: details.trust_unique_no,
        password: details.password,
        address: details.address,
        contri_received: details.contri_received,
        Date_Joined: details.Date_Joined
    };
    
    
    let t_name=newuser.name
   
   
    const volunt_req= await volunteerdata.find({Trust_name:newuser.name});
   
    let stdate=[];
    let endate=[];
    for(let i=0;i<volunt_req.length;i++){
        let sdate=volunt_req[i].start_date;
        let edate=volunt_req[i].end_date;
        sdate=formatDate(sdate.toString())
        edate=formatDate(edate.toString())
        volunt_req[i].start_date=sdate;
        volunt_req[i].end_date=edate;
        stdate[i]=sdate;
        endate[i]=edate;
        
        
      

    }


    res.render("trust_account", { trust: newuser,volunt_req:volunt_req,sdate:stdate,edate:endate});

})
route.post("/account", async (req, res) => {
    const user = await database_model.findOne({ _id: req.cookies.id });
    console.log(req.body);
    const changes_data = {
        name: req.body.name,
        state: req.body.state,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        trust_unique_no: req.body.trust_unique_no,
        password: user.password,
        address: req.body.address,
        contri_received: req.body.contri_received,
        Date_Joined: req.body.Date_Joined,
        signed_url: user.url
    };

    res.clearCookie('id');
    await database_model.deleteOne({ _id: user._id });
    const resl = await database_model.create(changes_data);
    res.cookie("id", resl._id, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(200).redirect("/");

})
route.get("/trustinfo", async (req, res) => {
    res.render("trust_info");
})
route.post("/trustinfo", upload.array('fileUpload'), async (req, res) => {
    let url;
    try {
        console.log(req.body);
        console.log(req.files);
        await s3uploadV2(req.files[0], req.body.trust_unique_no, process.env.TRUST_OWNER_BUCKET);
        await s3uploadV2(req.files[1], req.body.trust_unique_no, process.env.TRUST_IMAGES_BUCKET);
        url = await getobjecturl(process.env.TRUST_IMAGES_BUCKET, req.body.trust_unique_no);
        console.log("file added successfully");

    } catch (err) {
        console.log(err);
    }
    const trust_details = {
        name: req.body.name,
        about1: req.body.about1,
        nameOwner: req.body.nameOwner,
        about2: req.body.about2,
        trust_unique_no: req.body.trust_unique_no,
        trust_types: req.body.trust_types,
        signed_url:url
    }
    const trust = await trust_info.create(trust_details);
    console.log(trust);
    return res.status(200).redirect("/");

});

route.post("/volunt_req", async (req, res) => {
    try {
        const details = await database_model.findOne({ _id: req.cookies.id });
        console.log(details.name)
        console.log(req.body);
        if(req.body.type==="accept"){
            mail.approval(req.body.email,details.name)
        }
        if(req.body.type==="decline"){
            mail.decline(req.body.email,details.name)
        }
        const deleteResult = await volunteerdata.deleteMany({ email: req.body.email });


    } catch (err) {
        console.log(err);
    }
    return res.status(200).redirect("/");

});

module.exports = route;
