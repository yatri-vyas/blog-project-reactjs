// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

// Step 1 — create empty context
const AuthContext = createContext();

// Step 2 — AuthProvider wraps whole app
export const AuthProvider = ({ children }) => {

  // check localStorage on app start
  // if user was logged in before → stay logged in
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // login function — saves user in state + localStorage
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // logout function — clears everything
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    // Step 3 — provide user, login, logout to all components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 4 — custom hook so any file can use auth easily
export const useAuth = () => useContext(AuthContext);