const jsonwebtoken_verification = require("../controller/jwt_verification");
const user_login_verification = (req, res, next) => {
  if (req.cookies.cookie) {
    console.log(req.cookies.cookie.Value);
    if (jsonwebtoken_verification.getuser(req.cookies.cookie)) {
      next();
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
};

module.exports = user_login_verification;
