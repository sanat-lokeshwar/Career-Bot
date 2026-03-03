/**
 * Root application component.
 * Defines all application routes.
 */

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Main Chat Page */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
