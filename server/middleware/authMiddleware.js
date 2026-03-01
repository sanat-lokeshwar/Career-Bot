const admin = require("../config/firebase")
const User = require("../models/User")

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    const token = authHeader.split(" ")[1]

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token)

    // Check if user exists in MongoDB
    let user = await User.findOne({ firebaseUid: decodedToken.uid })

    // If not exist, create user automatically
    if (!user) {
      user = await User.create({
        name: decodedToken.name || "User",
        email: decodedToken.email,
        profilePic: decodedToken.picture || "",
        firebaseUid: decodedToken.uid
      })
    }

    req.user = user
    next()

  } catch (error) {
    console.error("Auth Error:", error.message)
    return res.status(401).json({ message: "Not authorized, invalid token" })
  }
}

module.exports = protect