const Posts = require("../models/post.model");
const User = require("../models/users.model");

class PostController {
  static all = async (req, res) => {
    try {
      const post = await Posts.find();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  static create = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await User.findById(userId);
      const newPost = new Posts({
        userId,
        firtsName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        picturePath,
        userPicturePath: user.picturePath,
        likes: {},
        comment: [],
      });
      await newPost.save();
      const post = await Posts.find();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };
  static getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Posts.findOne({ userId: userId });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static likePosts = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Posts.findById(id);
      const isLiked = post.likes.get(userId);

      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
      const updatePost = await Posts.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
      return res.status(200).json(updatePost);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = PostController;
