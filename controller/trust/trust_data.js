const database = require("../../Models/Trust_Schema");
const express = require("express");
let route = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jsonwebtoken_verification = require("../jwt_verification");
const multer = require("multer");
const path = require("path");

route.use(cookie());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path_of_file = path.join(__dirname, "../../public/trust_verify_docs");
    console.log(req.files);
    console.log(path_of_file);
    cb(null, path_of_file);
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000000 },
});
route.post("/login", async (req, res) => {
  const { email, pswd } = req.body;

  try {
    const t_user = await database.findOne({ email });

    if (t_user) {
      const passwordMatch = await bcrypt.compare(pswd, t_user.password);

      if (passwordMatch) {
        res.cookie("cookie", jsonwebtoken_verification.setuser(t_user), {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("id", t_user._id, { maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.cookie("role", "trust", { maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.redirect("/");
      } else {
        res.status(401).json({ message: "Incorrect email or password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

route.post("/signup", upload.single('t_docs'), async (req, res) => {

  const existingUser = await database.findOne({ trust_unique_no: req.body.trust_no });
  if (existingUser) {
    console.log("got it");
    // If the email already exists, send a response indicating the conflict
    return res.status(409).send("Email already exists");
  }

  if (
    req.body.trust_pass === " " ||
    req.body.re_trsut_pass === "" ||
    req.body.trust_pass !== req.body.re_trust_pass
  ) {
    console.log("pass error");
    res.status(409).send("Enter  Trust password correctly");
  }

  let url = "path to file";


  const hashedpassword = await bcrypt.hash(req.body.trust_pass, 10);
  const newTrustdetail = new database({
    name: req.body.txt,
    state: req.body.indian_state,
    trust_unique_no: req.body.trust_no,
    email: req.body.email,
    phonenumber: req.body.phno,
    password: hashedpassword,
    signed_url: url
  });
  try {
    const newTrustdetail_info = await newTrustdetail.save();
    console.log(newTrustdetail_info);
    res.cookie("cookie", jsonwebtoken_verification.setuser(newTrustdetail_info), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("id", newTrustdetail._id, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie("role", "trust", { maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
