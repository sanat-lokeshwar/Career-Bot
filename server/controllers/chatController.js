const Chat = require("../models/Chat")

// Create new chat
const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      user: req.user._id,
      title: "New Chat",
      messages: []
    })

    res.status(201).json(chat)
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat" })
  }
}

// Get all chats of logged-in user
const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ updatedAt: -1 })

    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats" })
  }
}

// Get single chat
const getSingleChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user._id
    })

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" })
    }

    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat" })
  }
}

// Add message to chat
const addMessage = async (req, res) => {
  try {
    const { content, role } = req.body

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user._id
    })

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" })
    }

    chat.messages.push({
      role,
      content
    })

    await chat.save()

    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json({ message: "Failed to add message" })
  }
}

module.exports = {
  createChat,
  getUserChats,
  getSingleChat,
  addMessage
}