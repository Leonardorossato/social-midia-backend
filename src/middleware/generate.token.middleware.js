const jwt = require("jsonwebtoken");
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

const gerenateAuthToken = async () => {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
    },
    privateKey,
    { expiresIn: "1d" }
  );

  return token;
};

module.exports = gerenateAuthToken;
