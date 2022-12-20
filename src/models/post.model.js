const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const postsSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, required: false },
    description: { type: String, required: false },
    picturePath: { type: String, required: false },
    userPicturePath: { type: String, required: false },
    likes: { type: Map, of: Boolean, required: false },
    comment: { type: Array, default: [], required: false },
  },
  { timestamps: new Date("DD/MM/YY hh:mm:ss") }
);

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
