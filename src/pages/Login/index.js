"use client";

import { useState } from "react";
import "./index.css";
import Link from "next/link";
import Header from "../../components/Header";
import { AuthProvider } from '../../components/Auth/AuthContext';


export default function Login() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  function IndexPage() {
    const [loginStatus, setLoginStatus] = useState(false);
  }
  
  const handleLogin = async () => {
    if (username === "" || password === "") {
      setErrorMessage("Please fill out the fields.");
      return;
    } else {
      setErrorMessage("");
    }
    // Temporary authentication check DELETE LATER
    if (username === "admin" && password === "admin") {
      setLoginStatus(true);
      console.log("Logged in as admin, successfully authenticated:" + "👋");
      setErrorMessage("Welcome Admin");

    } else {
      // Original logic for API call
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        });

        if (response.ok) {
          setLoginStatus(true);
          console.log("OK");
        } else {
          // Handle errors
          console.error("Login failed");
          setErrorMessage("Your login information is incorrect. Do you have an account?");
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    }
  };
  return (
      <>
      <AuthProvider>
      <div>
      <Header loginStatus={loginStatus}/>
      </div>
      
      <div className="login-container">
      
      <h1>Login Here!</h1>
      <div className="login-status">{loginStatus ? "Logged in" : "Not logged in"}</div>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
      <div className="error-message">{errorMessage}</div>
      <button class="button">
      <Link href="/">Back to Home!</Link>
      </button>
    </div>
    </AuthProvider>
      </>
   
  );
}