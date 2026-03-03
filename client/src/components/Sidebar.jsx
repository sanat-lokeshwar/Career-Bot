/**
 * Sidebar
 * Handles:
 * - Chat list
 * - Create chat
 * - Delete chat
 * - Theme toggle
 * - Logout
 */

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Sidebar = ({
  chatId,
  setChatId,
  setMessages,
  theme,
  setTheme,
  chats,
  setChats,
}) => {
  const { user, logout } = useAuth();

  // ---------------------------------
  // Fetch Chats
  // ---------------------------------
  const fetchChats = async () => {
    try {
      const res = await api.get("/chats");
      setChats(res.data);
    } catch (err) {
      console.error("Fetch chats error:", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // ---------------------------------
  // Create New Chat
  // ---------------------------------
  const handleNewChat = async () => {
    try {
      const res = await api.post("/chats");

      setChatId(res.data._id);
      setMessages([]);

      fetchChats();
    } catch (err) {
      console.error("Create chat error:", err);
    }
  };

  // ---------------------------------
  // Switch Chat
  // ---------------------------------
  const handleSelectChat = (chat) => {
    setChatId(chat._id);
    setMessages(chat.messages);
  };

  // ---------------------------------
  // Delete Chat
  // ---------------------------------
  const handleDeleteChat = async (e, id) => {
    e.stopPropagation();

    try {
      await api.delete(`/chats/${id}`);
      fetchChats();

      if (chatId === id) {
        setChatId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="sidebar">
      {/* ============================= */}
      {/* Header + Theme Toggle */}
      {/* ============================= */}
      <div
        className="sidebar-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>CareerBot</span>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            background: "transparent",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            padding: "4px 8px",
            cursor: "pointer",
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* ============================= */}
      {/* Chat List Section */}
      {/* ============================= */}
      <div className="sidebar-content">
        <button
          style={{ width: "100%", padding: "10px" }}
          onClick={handleNewChat}
        >
          + New Chat
        </button>

        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => handleSelectChat(chat)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background:
                chatId === chat._id ? "var(--border-color)" : "transparent",
              marginTop: "5px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{chat.title || "Untitled Chat"}</span>

            <button
              onClick={(e) => handleDeleteChat(e, chat._id)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "red",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ============================= */}
      {/* User Section */}
      {/* ============================= */}
      <div className="sidebar-footer">
        {user && (
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={user.photoURL}
                alt="Profile"
                width="40"
                style={{ borderRadius: "50%" }}
              />
              <div>{user.displayName}</div>
            </div>

            <button
              onClick={logout}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "8px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
