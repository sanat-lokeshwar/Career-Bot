/**
 * PrivateRoute
 * Protects routes that require authentication.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While checking auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated → redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }

  // If authenticated → allow access
  return children;
};

export default PrivateRoute;
