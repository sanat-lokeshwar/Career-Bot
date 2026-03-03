const { isCareerRelated } = require("../utils/careerFilter");
const { generateCareerResponse } = require("../services/groqService");
const Chat = require("../models/Chat");

// Create new chat
const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      user: req.user._id,
      title: "New Chat",
      messages: [],
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat" });
  }
};

// Get all chats of logged-in user
const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

// Get single chat
const getSingleChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat" });
  }
};

// Add message to chat
const addMessage = async (req, res) => {
  try {
    const { message, role } = req.body;

    if (!message || !role) {
      return res.status(400).json({ message: "Message and role required" });
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: message, // ✅ FIXED
    });

    // Auto-generate title if it's the first message
    if (chat.title === "New Chat") {
      chat.title =
        message.length > 30 ? message.substring(0, 30) + "..." : message;
    }

    let assistantReply = "";

    if (!isCareerRelated(message)) {
      assistantReply =
        "I'm here to help with your career journey! Ask me about resumes, interviews, or career paths.";
    } else {
      assistantReply = await generateCareerResponse(message);
    }

    // Save assistant reply
    chat.messages.push({
      role: "assistant",
      content: assistantReply, // ✅ FIXED
    });

    await chat.save();

    res.status(200).json({
      reply: assistantReply,
    });
  } catch (error) {
    console.error("Add Message Error:", error);
    res.status(500).json({ message: "Failed to add message" });
  }
};

// Delete chat
const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.chatId,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Delete Chat Error:", error);
    res.status(500).json({ message: "Failed to delete chat" });
  }
};

module.exports = {
  createChat,
  getUserChats,
  getSingleChat,
  addMessage,
  deleteChat,
};
