const express = require("express");
let login = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User_schema");

login.route("/").get((req, res) => {
  res.render("user_login");
});
login.route("/").post(async (req, res) => {
  const { email, pswd } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(pswd, user.password);

      if (passwordMatch) {
        console.log("logged in");
        return res.status(200).redirect("/");
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
