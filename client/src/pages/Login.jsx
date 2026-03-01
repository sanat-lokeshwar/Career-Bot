import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../services/firebase"
import axios from "axios"
import "./Login.css"

function Login() {

  const handleLogin = async () => {
    try {
      // Open Google popup
      const result = await signInWithPopup(auth, provider)

      // Get Firebase ID token
      const token = await result.user.getIdToken()

      // Send token to backend
      const response = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    

      console.log("User from backend:", response.data)

      alert("Login Successful ✅ Check console!")
        console.log("TOKEN:", token)

    } catch (error) {
      console.error("Login Error:", error)
      alert("Login Failed ❌")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>CareerBot</h1>
        <p>Your AI Career Assistant</p>
        <button onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login