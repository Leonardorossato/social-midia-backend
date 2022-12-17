const jwt = require("jsonwebtoken");
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const verifyToken = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res
      .status(400)
      .json({ message: "Access Denied. No token provided." });
  }

  if (token.startsWith("Bearer "))
    token = token.slice(7, token.length).trimLeft();

  jwt.verify(token, PRIVATE_KEY, (err, validateToken) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    } else {
      req.user = validateToken;
    }
    next();
  });
};

module.exports = { verifyToken };
