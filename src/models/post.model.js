const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const postsSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "users", required: true },
    firtsName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, required: false },
    description: { String},
    picturePath: { type: String, required: false },
    userPicturePath: { type: String, required: false },
    likes: { type: Map, of: Boolean, required: false },
    comment: { type: Array, default: [] },
  },
  { timestamps: new Date() }
);

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
