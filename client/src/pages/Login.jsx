/**
 * Login Page
 * Handles Google Authentication
 * Verifies token with backend
 * Redirects to /chat after successful login
 */

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 1️⃣ Google Sign-In Popup
      const result = await signInWithPopup(auth, provider);

      // 2️⃣ Get Firebase ID Token
      const token = await result.user.getIdToken();

      // 3️⃣ Send token to backend for verification
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User verified from backend:", response.data);

      // 4️⃣ Store token locally (for API requests)
      localStorage.setItem("token", token);

      // 5️⃣ Redirect to chat page
      navigate("/chat");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>CareerBot</h1>
        <p>Your AI Career Assistant</p>

        <button onClick={handleLogin}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default Login;
