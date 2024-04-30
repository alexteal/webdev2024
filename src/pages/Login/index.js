"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../components/Auth/index"; // Only import what's used
import Header from "../../components/Header";
import "./index.css";


export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
          login(username, password); // Set the username in the auth context
          setTimeout(() => {
            router.push("/");
          }, 50);
        } else {
          setErrorMessage(
            "Your login information is incorrect. Do you have an account?",
          );
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        setErrorMessage("Failed to log in, please try again.");
      }
  };
  return (
    <>
        <div>
          <Header />
        </div>
        <div className="login-container">
          <h1>Login Here!</h1>
          <div className="login-status">
            <p>
              {isLoggedIn ? "Logged in. You will be redirected shortly." : ""}
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
            <Link href="/CreateAccount">
            <button className="login-button">Signup
            </button>
            </Link>
          </form>
        </div>
    </>
  );
}
