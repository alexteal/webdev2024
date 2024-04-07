"use client";
import React, { useState } from "react";
import { useAuth } from "../../Auth";
const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoggedIn } = useAuth();
  const handleSignup = () => {
    signup(username, password);
  };
  return (
    <div>
      <h1>Create Account Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Create Account</button>
      {isLoggedIn() ? (
        <p>You have successfully created an account and logged in!</p>
      ) : (
        <p>Please create an account to continue</p>
      )}
    </div>
  );
};
export default CreateAccount;
