const jwt = require("jsonwebtoken");
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

const verifyToken = (req, res, next) => {
  const token = req.header("Bearer");
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



module.exports = { verifyToken };
