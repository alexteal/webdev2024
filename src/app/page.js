"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
//primary routing
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  return (
    <main className={styles.main}>
      <h1>Hello</h1>
      {isLoggedIn ? "true" : "false"}
      <button className="button">
        <Link href="/">Main</Link>
      </button>
      <button className="button">
        <Link href="/Login">Login</Link>
      </button>
      <button className="button" onClick={logoutHandler}>
        <p>Logout</p>
      </button>
      <button className="button">
        <Link href="/CreateAccount">Signup</Link>
      </button>
    </main>
  );
}
