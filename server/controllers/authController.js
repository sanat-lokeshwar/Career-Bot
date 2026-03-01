const User = require("../models/User")

// Return current logged in user
const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

module.exports = { getCurrentUser }