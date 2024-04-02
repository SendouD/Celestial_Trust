const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phonenumber: Number,
  password: String,
  state: { type: String, default: "Add State" },
  address: { type: String, default: "Add Address" },
  contri_num: { type: Number, default: 0 },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
