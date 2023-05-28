const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  let token = req.cookies.auth_cookie;
  if (!token) {
    token = req.headers.auth_cookie;
  }
  if (!token) {
    res.status(401).json({ msg: "لطفا لاگین کنید!", router: "login" });
  } else {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminData = await User.find({ email: adminEmail });
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      if (
        verified._id == adminData[0]._id &&
        verified.username == adminData[0].username
      ) {
        req.user = verified;
        next();
      } else {
        res.status(422).json({ msg: "شما اجازه ی دسترسی ندارید!" });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({ msg: "لطفا لاگین کنید!", router: "login" });
    }
  }
};
