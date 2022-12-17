const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

class AuthController {
  static login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(403)
          .json({ message: "Invalid email address or password." });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid  password." });
      }
      const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: "1d",
      });
      return res.status(201).json({ access_token: token });
    } catch (error) {
      return res.status(404).json({ message: "Invalid login credentials." });
    }
  };

  static register = async (req, res) => {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.firstName,
      email: req.body.email,
      password: (await bcrypt.hash(req.body.password, 10)).toString(),
      picturePath: req.body.picturePath,
      friends: req.body.friends,
      location: req.body.location,
      occupation: req.body.occupation,
      viewProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json("Email already in use");
      }
      const result = await newUser.save(user);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(404).json("Erro in create this user" + error);
    }
  };
}

module.exports = AuthController;
