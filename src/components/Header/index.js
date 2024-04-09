"use client";
import React from "react"; // Removed unused imports
import styles from "./Header.module.css";
import { useAuth } from "../Auth/AuthContext"; // Only import what's used
import Link from "next/link";

function Header() {
  const { isAuthenticated, toggleAuth } = useAuth(); // Call useAuth as a function and destructure

  ///?? i waas having a lot of issues with ^^ This shit.

  // Dynamic greeting based on time of day (saw this online and thought it was cutsie 😊)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>PictoChat Clone</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        {/* <a href="/about">About Us</a>
        <a href="/contact">Contact</a> */}
        {isAuthenticated && <Link href="/dashboard">Dashboard</Link>}
        {!isAuthenticated && <Link href="/CreateAccount">Sign Up</Link>}
      </nav>
      <div className={styles.authStatus}>
        <h2>
          {getGreeting()}, {isAuthenticated ? "User" : "Guest"}!
        </h2>
        {isAuthenticated ? (
          <div>
            <Link href="/">
              <button
                className={styles.logoutButton}
                onClick={() => toggleAuth()}
              >
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <button
              className={styles.logoutButton}
              onClick={() => toggleAuth()}
            >
              login
            </button>
            <h2>Not authenticated</h2>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
