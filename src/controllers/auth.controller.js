const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../middleware/validation.middleware");
const User = require("../models/users.model");
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
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
      const token = jwt.sign({ _id: user._id }, PRIVATE_KEY, {
        expiresIn: "1d",
      });
      delete user.password;
      return res.status(201).json({ access_token: token });
    } catch (error) {
      return res.status(404).json({ message: "Invalid login credentials." });
    }
  };

  static register = async (req, res) => {
    const newUser = new User({
      name: req.body.name,
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
      const { error } = validateUser(req.body);
      if (error) res.status(400).json({ message: error.details[0].message });
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
