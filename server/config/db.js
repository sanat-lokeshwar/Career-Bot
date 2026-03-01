const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: 😉`)
  } catch (error) {
    console.error("Database connection failed:", error.message)
    process.exit(1) // Stop server if DB fails
  }
}

module.exports = connectDB