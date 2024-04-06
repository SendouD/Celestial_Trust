const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

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

mongoose.connect("mongodb://127.0.0.1:27017/your_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");
});

app.get("/", (req, res) => {
  if (req.cookies.cookie) {
    return res.render("index", { signin: "Logout" });
  } else {
    return res.render("index", { signin: "Signin" });
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
