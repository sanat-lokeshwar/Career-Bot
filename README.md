# 🚀 CareerBot – AI Career Assistant (MERN + Groq)

CareerBot is a full-stack AI-powered career guidance chatbot built using the MERN stack with Firebase Authentication and Groq (LLaMA3) integration.

It provides secure multi-session chat functionality with intelligent career filtering and modern ChatGPT-style UI.

---

## 🔥 Features

### 🔐 Authentication
- Firebase Google Authentication
- Backend token verification
- Protected routes with middleware
- Secure session handling

### 💬 Smart Multi-Chat System
- Create, switch, and delete chats
- Automatic chat title generation
- Smart login behavior:
  - Reuses empty chats
  - Never auto-opens chats with messages
  - Prevents duplicate empty chats

### 🤖 AI Integration
- Groq (LLaMA3 model)
- Career-only question filtering
- Fallback for non-career queries
- Markdown-formatted responses

### 🎨 Modern UI (React + CSS)
- ChatGPT-style layout
- Animated typing indicator
- Auto-scroll behavior
- Career Tip of the Day
- Dark / Light mode (persistent)
- Clean responsive layout

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Normal CSS (No Tailwind)
- Axios
- React Router
- React Markdown

### Backend
- Node.js
- Express
- MongoDB Atlas
- Firebase Admin SDK
- Groq API (LLaMA3)

---

## 📂 Project Structure
```
└── 📁client
    └── 📁public
        ├── vite.svg
    └── 📁src
        └── 📁assets
        └── 📁components
        └── 📁context
        └── 📁pages
            ├── Login.css
            ├── Login.jsx
        └── 📁services
            ├── firebase.js
        └── 📁utils
        ├── App.jsx
        ├── main.jsx
    ├── .env
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```


```
└── 📁server
    └── 📁config
        ├── db.js
        ├── firebase.js
    └── 📁controllers
        ├── authController.js
        ├── chatController.js
    └── 📁firebase
        ├── serviceAccountKey.json
    └── 📁middleware
        ├── authMiddleware.js
    └── 📁models
        ├── Chat.js
        ├── User.js
    └── 📁routes
        ├── authRoutes.js
        ├── chatRoutes.js
    └── 📁services
        ├── groqService.js
    └── 📁utils
        ├── careerFilter.js
    ├── .env
    ├── package-lock.json
    ├── package.json
    └── server.js
```
