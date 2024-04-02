const js = require("jsonwebtoken");
const secret = "celestial";
function setuser(user) {
  return js.sign(
    {
      username: user.username,
      email: user.email,
      phonenum: user.phonenumber,
      _id: user._id,
    },
    secret
  );
}
function getuser(token) {
  if (!token) return null;
  return js.verify(token, secret);
}

module.exports = {
  setuser,
  getuser,
};
