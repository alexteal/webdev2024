"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from '../../components/Auth/AuthContext'; // Adjust the path as necessary
import Header from "../../components/Header";
import "./index.css";

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

  const handleLogin = async () => {
     // Temporary authentication check DELETE LATER
  if (username === "admin" && password === "admin") {
    setLoginStatus(true);
    // Proceed to redirect right after setting the state
    setTimeout(() => {
      router.push('/');
    }, 1000); // Redirect after a delay
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
        setLoginStatus(true);
        setTimeout(() => {
          router.push('/');
        }, 1000); // Redirect after a delay
      } else {
        setErrorMessage("Your login information is incorrect. Do you have an account?");
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <div className="error-message">{errorMessage}</div>
          <button className="login-button">
            <Link href="/CreateAccount">Signup</Link>
          </button>
        </div>
      </AuthProvider>
    </>
  );
}
