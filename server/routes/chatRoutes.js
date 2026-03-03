const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createChat,
  getUserChats,
  getSingleChat,
  addMessage,
} = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");
const deleteChat = require("../controllers/chatController").deleteChat;
const router = express.Router();

router.post("/", protect, createChat);
router.get("/", protect, getUserChats);
router.get("/:chatId", protect, getSingleChat);
router.post("/:chatId/message", protect, addMessage);
router.delete("/:chatId", authMiddleware, deleteChat);
module.exports = router;
