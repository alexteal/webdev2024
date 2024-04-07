import React, { useState } from "react";
import { useAuth } from "../../Auth";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn } = useAuth();
  const handleLogin = () => {
    login(username, password);
  };
  return (
    <div>
      <h1>Login Page</h1>
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
      <button onClick={handleLogin}>Login</button>
      {isLoggedIn() ? (
        <p>You are logged in!</p>
      ) : (
        <p>Please login to continue</p>
      )}
    </div>
  );
};
export default Login;
