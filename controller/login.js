const express = require("express");
let login = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User_schema");
const cookie = require("cookie-parser");
const jsonwebtoken_verification = require("./jwt_verification");
login.use(cookie());

login.route("/").get((req, res) => {
  if(req.cookies.cookie && req.cookies.id){
    res.clearCookie('cookie');
    res.clearCookie('id');
    if(req.cookies.role){
      res.clearCookie('role');
    }
    res.render("index",{signin:"Signin"});
    
  }else{
    res.render("user_login");
  }
});
login.route("/").post(async (req, res) => {
  const { email, pswd } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(pswd, user.password);

      if (passwordMatch) {
        res.cookie("cookie", jsonwebtoken_verification.setuser(user), {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("id", user._id, { maxAge: 7 * 24 * 60 * 60 * 1000 });
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

module.exports = login;
