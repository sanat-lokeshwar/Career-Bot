// Import dependencies
const connectDB = require("./config/db")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

// Initialize app
const app = express()

// Connect to Database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

const authRoutes = require("./routes/authRoutes")
const chatRoutes = require("./routes/chatRoutes")
app.use("/api/auth", authRoutes)
app.use("/api/chats", chatRoutes)

// Test Route
app.get("/", (req, res) => {
  res.send("CareerBot API is running...")
})

// Define Port
const PORT = process.env.PORT || 5000



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})