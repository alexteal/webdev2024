"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mainCSS from "../../app/page.module.css";
import { useAuth } from "../../components/Auth/index"; // Only import what's used
import Header from "../../components/Header";
import "./index.css";

export default function CreateAccount() {
  const { login, isLoggedIn } = useAuth();
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (loginStatus) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [loginStatus, router]);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setErrorMessage("Please fill out the fields.");
      return;
    } else {
      setErrorMessage("");
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // we're not gonna worry about security here. It's pictochat
        // for god's sake
        body: JSON.stringify({ username: username, password: password }),
      });
      if(response.status === 409) {
        setErrorMessage("Username Taken! :3 pls pick another");
        return;
      }
      if (response.ok) {
        setLoginStatus(true);
        login(username, password);
        console.log("OK");
      } else {
        // Handle errors
        console.error("Signup failed");
        setErrorMessage("Our signup process failed. We're working on a fix.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  return (
    <>
        <Header loginStatus={isLoggedIn} />
        <div className="login-container">
          <h1>Signup Here!</h1>
          <div className="login-status">
            {isLoggedIn ? "Logged in. You will be redirected shortly." : ""}
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
            Sign up
          </button>
          <div className="error-message">{errorMessage}</div>
          <Link href="/">
          <button className="login-button">
           Home
          </button>
          </Link>
        </div>
    </>
  );
}
