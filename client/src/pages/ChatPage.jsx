/**
 * ChatPage
 * Global state holder for:
 * - Theme
 * - Chats
 * - Current Chat
 *
 * Login Behavior:
 * - If empty chat exists → open it
 * - If no empty chat → create new one
 * - Never open chat with messages on login
 */

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import api from "../services/api";
import "../styles/layout.css";

const ChatPage = () => {
  // ===============================
  // THEME STATE
  // ===============================
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ===============================
  // CHAT STATE
  // ===============================
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  // ===============================
  // INITIAL LOGIN CHAT LOGIC
  // ===============================
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const res = await api.get("/chats");
        const existingChats = res.data;

        setChats(existingChats);

        // 🔎 Find an EMPTY chat safely
        const emptyChat = existingChats.find(
          (chat) => !chat.messages || chat.messages.length === 0,
        );

        if (emptyChat) {
          // 🟢 Open existing empty chat
          setChatId(emptyChat._id);
          setMessages(emptyChat.messages || []);
        } else {
          // 🔵 No empty chat → create new one
          const newChat = await api.post("/chats");

          setChatId(newChat.data._id);
          setMessages([]);

          setChats([newChat.data, ...existingChats]);
        }
      } catch (error) {
        console.error("Chat initialization failed:", error);
      }
    };

    initializeChat();
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        chatId={chatId}
        setChatId={setChatId}
        setMessages={setMessages}
        chats={chats}
        setChats={setChats}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="chat-container">
        <ChatWindow
          chatId={chatId}
          messages={messages}
          setMessages={setMessages}
          setChats={setChats}
        />
      </div>
    </div>
  );
};

export default ChatPage;
