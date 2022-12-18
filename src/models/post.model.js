const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    firtsName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, required: false },
    description: { String, required: false },
    picturePath: { type: String, required: false },
    userPicturePath: { type: String, required: false },
    likes: { type: Map, of: Boolean, required: false },
    comment: { type: Array, default: [] },
  },
  { timestamps: new Date() }
);

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
