const mongoose = require("mongoose");
require("dotenv").config();



mongoose.connect(`mongodb://127.0.0.1:27017/celestial_trust`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");

});


module.exports = db;