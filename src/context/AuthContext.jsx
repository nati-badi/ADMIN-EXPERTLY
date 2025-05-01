import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
export const AuthContext = createContext();

// Export a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");

    if (token && adminData) {
      setIsSignedIn(true);
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setIsSignedIn(false);
    setAdmin(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, admin, setAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
