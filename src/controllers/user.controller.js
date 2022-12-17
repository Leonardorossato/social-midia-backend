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

  static findOneById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User with this id not found");
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json("User not found");
    }
  };

  static deleted = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User with this id not found");
      }
      await user.delete(user);
      return res.status(200).json("User deleted sucessfully");
    } catch (error) {
      return res.status(500).json("User not found");
    }
  };
  static getUserFriends = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formatted = friends.map(
        ({ firstName, lastName, email, password, picturePath }) => {
          return {
            _id,
            firstName,
            lastName,
            email,
            password,
            picturePath,
          };
        }
      );
      return res.status(200).json(formatted);
    } catch (error) {
      return res.status(500).json("Erro to get all Friends");
    }
  };
}

module.exports = UserController;
