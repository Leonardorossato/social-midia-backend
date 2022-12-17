const jwt = require("jsonwebtoken");
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

const authenticationTokenUser = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(400)
      .json({ message: "Access Denied. No token provided." });
  }

  jwt.verify(token, privateKey, (err, validateToken) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    } else {
      req.user = validateToken;
    }
    next();
  });
};

const authenticationTokenAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(400)
      .json({ message: "Access Denied. No token provided." });
  }

  jwt.verify(token, privateKey, (err, validateToken) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    } else {
      if (!validateToken) {
        return res
          .status(403)
          .json({ message: "You don't have access to this content" });
      }
    }
    req.user = validateToken;
    next();
  });
};

module.exports = { authenticationTokenUser, authenticationTokenAdmin };
