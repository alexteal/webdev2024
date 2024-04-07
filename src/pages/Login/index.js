"use client";

import { useState } from "react";

export default function Login() {
  const [loginStatus, setLoginStatus] = useState(false);
  return <button onClick={setLoginStatus(true)}></button>;
}
