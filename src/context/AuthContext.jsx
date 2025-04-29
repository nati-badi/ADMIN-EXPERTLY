import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");
    if (token && adminData) {
      setIsSignedIn(true);
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, admin, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
