import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");

    if (token && adminData) {
      setIsSignedIn(true);
      setAdmin(JSON.parse(adminData));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, admin, setAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
