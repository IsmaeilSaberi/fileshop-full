const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.cookies.auth_cookie;
  if (!token) {
    token = req.headers.auth_cookie;
  }
  if (!token) {
    res.status(401).json({ msg: "لطفا لاگین کنید!", router: "login" });
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      console.log(error);
      res.status(200).json({ msg: "لطفا لاگین کنید!", router: "login" });
    }
  }
};
