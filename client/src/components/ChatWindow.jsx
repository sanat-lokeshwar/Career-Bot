import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import api from "../services/api";

const careerTips = [
  "Keep your LinkedIn profile updated regularly.",
  "Build at least 2 strong real-world projects.",
  "Master data structures for technical interviews.",
  "Practice behavioral interview questions.",
  "Contribute to open-source to stand out.",
];

const ChatWindow = ({ chatId, messages, setMessages, setChats }) => {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  /**
   * Scroll to bottom on new message
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /**
   * Fetch existing chats on load
   */

  /**
   * Send message to backend
   */
  const handleSend = async () => {
    if (!input.trim() || !chatId) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await api.post(`/chats/${chatId}/message`, {
        message: input,
        role: "user",
      });

      const aiMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // 🔥 Refresh chat list to update title
      const updatedChats = await api.get("/chats");
      setChats(updatedChats.data);
    } catch (error) {
      console.error("Message send error:", error);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // 🔥 EMPTY STATE (No Chat Selected)
  if (!chatId) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "var(--text-secondary)",
          height: "100%",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>🚀 Welcome to CareerBot</h2>
        <p>Start a new chat to get career guidance.</p>
      </div>
    );
  }

  return (
    <>
      {/* ============================ */}
      {/* Messages Section */}
      {/* ============================ */}
      <div className="chat-messages">
        {/* Career Tip (only when no messages in selected chat) */}
        {messages.length === 0 && (
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <strong>💡 Career Tip of the Day</strong>
            <p style={{ marginTop: "8px" }}>
              {careerTips[Math.floor(Math.random() * careerTips.length)]}
            </p>
          </div>
        )}

        {/* Render Messages */}
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} content={msg.content} />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="message-row assistant">
            <div className="message-bubble assistant">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ============================ */}
      {/* Input Section */}
      {/* ============================ */}
      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input
            type="text"
            placeholder="Ask CareerBot anything about your career..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />

          <button onClick={handleSend} className="send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
