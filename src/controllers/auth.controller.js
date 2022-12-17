const bcrypt = require("bcrypt");
const User = require("../models/users.model");

class AuthController {
  static login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
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
    } catch (error) {
      return res.status(404).json({ message: "Invalid login credentials." });
    }
  };

  static register = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
        viewProfile,
        impressions,
      } = req.body;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await User.findOne({ email: email.req.body });
      if (newUser) {
        return res.staus(404).json("Email already in use");
      }
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        picturePath,
        friends,
        location,
        occupation,
        viewProfile: Math.floor(Math.random() * 1000),
        impressions: Math.floor(Math.random() * 1000),
      });
      await newUser.save(user);
      return res.staus(201).json(newUser);
    } catch (error) {
      return res.staus(404).json("Erro in create this user", error);
    }
  };
}

module.exports = AuthController;
