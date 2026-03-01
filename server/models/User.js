const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    profilePic: {
      type: String
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)