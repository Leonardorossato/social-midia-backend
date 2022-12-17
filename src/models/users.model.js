const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 255 },
    lastName: { type: String, required: true, min: 3, max: 255 },
    email: { type: String, required: true, unique: true, min: 3, max: 255 },
    password: { type: String, required: true, min: 3, max: 255 },
    picturePath: { type: String, default: "" },
    friends: { type: Array, default: [] },
    location: { type: String, required: false },
    occupation: { type: String, required: false },
    viewProfile: { type: Number, required: false },
    impressions: { type: Number, required: false }
  },
  { timestamps: true }
);

const User = mongoose.model("Users", usersSchema);
module.exports = User;
