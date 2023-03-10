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
        name: user.name,
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
      if (!post) return res.status(403).json("Post id not found");
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

  static deleted = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) return res.status(403).json("User id not found");
      const post = await Posts.findById(id);
      if (!post) return res.status(403).json("Post id not found");
      await Posts.findByIdAndRemove(post);
      return res.status(200).json({ message: "Post deleted succesfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = PostController;
