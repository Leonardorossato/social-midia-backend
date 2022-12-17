const User = require("../models/users.model");

class UserController {
  static all = async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = UserController;
