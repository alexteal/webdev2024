'use client'
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false, // provide default values
  toggleAuth: () => {}
});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

 
  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};