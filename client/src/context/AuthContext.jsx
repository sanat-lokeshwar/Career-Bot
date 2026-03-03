/**
 * AuthContext
 * Handles global authentication state using Firebase.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext();

/**
 * AuthProvider wraps the entire app
 * and provides user + token state globally.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("token", token);
        setUser(firebaseUser);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use AuthContext
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
