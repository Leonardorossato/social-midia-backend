const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3, max: 250 },
    email: { type: String, required: true, unique: true, min: 3, max: 255 },
    password: { type: String, required: true, min: 3, max: 255 },
    picturePath: { type: String, default: "", required: false },
    friends: { type: Array, default: [] },
    location: { type: String, required: false },
    occupation: { type: String, required: false },
    viewProfile: { type: Number, required: false },
    impressions: { type: Number, required: false },
  },
  { timestamps: new Date("DD/MM/YY hh:mm:ss") }
);

const User = mongoose.model("Users", usersSchema);
module.exports = User;
