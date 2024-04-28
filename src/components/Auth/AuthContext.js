"use client";
import React, { createContext, useContext, useState } from "react";
// Updated context with default values for isAuthenticated and username
const AuthContext = createContext({
  isAuthenticated: false,
  username: null, // default value for username
  toggleAuth: () => {},
});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null); // State to hold the username
  // Updated toggleAuth function to accept a username
  const toggleAuth = (newUsername) => {
    setIsAuthenticated(!isAuthenticated);
    setUsername(newUsername); // Set the username when toggling authentication
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, username, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
