"use client";

import { useState } from "react";
import Link from "next/link";
import "./index.css";

export default function Login() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    if (username === "" || password === "") {
      setErrorMessage("Please fill out the fields.");
      return;
    } else {
      setErrorMessage("");
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // we're not gonna worry about security here. It's pictochat
        // for god's sake
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        setLoginStatus(true);
        console.log("OK");
      } else {
        // Handle errors
        console.error("Login failed");
        setErrorMessage(
          "Your login information is incorrect. Do you have an account?",
        );
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  return (
    <div className="login-container">
      <h1>Login Here!</h1>
      <div className="login-status">
        {loginStatus ? "Logged in" : "Not logged in"}
      </div>
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
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <div className="error-message">{errorMessage}</div>
      <button className="login-button">
        <Link href="/CreateAccount">Signup</Link>
      </button>
    </div>
  );
}