const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require('./mongodb');
const Mailsender = require("./controller/email_backend");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const cookie = require("cookie-parser");
app.use(cookie());

const bcrypt = require("bcrypt");
const donate = require("./controller/donate");
const account = require("./controller/account");
const login = require("./controller/login");
const register = require("./controller/register");
const volunteer = require("./controller/volunteer_form");
const admin=require("./controller/admin/admin");
const trust=require("./controller/trust/trust")
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
console.log(path.join(__dirname, "views"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());



app.get("/", (req, res) => {
  const role=req.cookies.role;
  if(!role){
    if (req.cookies.cookie) {
      return res.render("index", { signin: "Logout" });
    } else {
      return res.render("index", { signin: "Signin" });
    }
  }else{
    if(role==="admin"){
      if (req.cookies.cookie) {
        return res.render("admin_index", { signin: "Logout" });
      } else {
        return res.render("admin_index", { signin: "Signin" });
      }
      

    }else{
      if (req.cookies.cookie) {
        return res.render("trust_index", { signin: "Logout" });
      } else {
        return res.render("trust_index", { signin: "Signin" });
      }

    }
  }
});

app.use("/donate", donate);
app.use("/login", login);
app.use("/register", register);
app.use("/volunteer", volunteer);
app.use("/account", account);
app.use("/trust",trust);
app.use("/admin",admin);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running in http://localhost:3000/`);
});
