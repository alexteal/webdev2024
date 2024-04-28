"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../../components/Auth/AuthContext"; // Adjust the path as necessary
import Header from "../../components/Header";
import "./index.css";
import { Form } from "react-router-dom";

export default function Login() {
  const { isAuthenticated, toggleAuth } = useAuth();
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  function IndexPage() {
    const [loginStatus, setLoginStatus] = useState(false);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    // Temporary authentication check DELETE LATER
    if (username === "admin" && password === "admin") {
      toggleAuth(username); // Set the username in the auth context
      setLoginStatus(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
          toggleAuth(username); // Set the username in the auth context
          setLoginStatus(true);
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          setErrorMessage(
            "Your login information is incorrect. Do you have an account?",
          );
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        setErrorMessage("Failed to log in, please try again.");
      }
    }
  };
  return (
    <>
      <AuthProvider>
        <div>
          <Header loginStatus={loginStatus} />
        </div>

        <div className="login-container">
          <h1>Login Here!</h1>
          <div className="login-status">
            <p>
              {loginStatus ? "Logged in. You will be redirected shortly." : ""}
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div>
              <input
                className="login-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                className="login-input"
                placeholder="Password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              placeholder="login"
              className="login-button"
              onClick={handleLogin}
              type="submit"
            />
            <div className="error-message">{errorMessage}</div>
            <button className="login-button">
              <Link href="/CreateAccount">Signup</Link>
            </button>
          </form>
        </div>
      </AuthProvider>
    </>
  );
}
