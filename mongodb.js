const mongoose = require("mongoose");
require("dotenv").config();



mongoose.connect(`mongodb+srv://FFSD:FFSD%40CHARITY%401234@ffsd.bmgbdqd.mongodb.net/CELESTIAL_TRUST?retryWrites=true&w=majority&appName=FFSD`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");
  
});


module.exports=db;