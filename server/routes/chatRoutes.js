const express = require("express")
const protect = require("../middleware/authMiddleware")
const {
  createChat,
  getUserChats,
  getSingleChat,
  addMessage
} = require("../controllers/chatController")

const router = express.Router()

router.post("/", protect, createChat)
router.get("/", protect, getUserChats)
router.get("/:chatId", protect, getSingleChat)
router.post("/:chatId/message", protect, addMessage)

module.exports = router