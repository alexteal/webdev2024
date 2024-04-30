"use client";
import { useEffect, useState } from "react";

export const useAuth = () => {
  // Use a function to initialize state to avoid computing during SSR
  const [token, setToken] = useState(() => {
    // Check if running in a browser
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');  // Safe to access localStorage
    }
    return null;  // Default to null in SSR
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);


  useEffect(() => {
    // Ensure effect runs only on the client
    if (typeof window !== 'undefined') {
      const handleStorageChange = (event) => {
        if (event.key === 'token') {
          setToken(localStorage.getItem('token'));  // Update token when localStorage changes
        }
      };

      window.addEventListener('storage', handleStorageChange);

      // Cleanup listener on component unmount
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  useEffect(() => {
    // This effect also needs to check for window because it directly uses localStorage
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);  // Save token to localStorage
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('token');  // Remove token from localStorage
        setIsLoggedIn(false);
      }
    }
  }, [token]);

  const login = (username, password) => {
    // Assuming direct login for simplicity, typically you'd validate this server-side
    setToken(username);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  const signup = (username, password) => {
    // Placeholder for signup logic
    login(username, password);
  };

  return {
    login,
    logout,
    signup,
    isLoggedIn,
  };
};
