if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const jwt = require("jsonwebtoken");

const envSecret = process.env.JWTSECRET;

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "no token provided" });
  }

  try {
    const decoded = jwt.verify(token, envSecret);

    req.user = decoded.user;

    // console.log(decoded, "decoded");
    next();
  } catch (error) {
    res.status(401).json({ msg: "token not valid" });
  }
};
