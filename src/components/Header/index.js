"use client";
import Link from "next/link";
import React from "react"; // Removed unused imports
import { useAuth } from "../Auth/AuthContext"; // Only import what's used
import styles from "./Header.module.css";
function Header() {
  const { isAuthenticated, toggleAuth } = useAuth();

  ///?? i waas having a lot of issues with ^^ This shit.

  // Dynamic greeting based on time of day (saw this online and thought it was
  // cutsie 😊)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  const autoLoginAdmin = () => {
    // Here you could also set any admin-specific state or perform additional
    // actions
    console.log("Logging in as admin automatically");
    toggleAuth();
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>PictoChat Clone</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        {isAuthenticated && <Link href="/dashboard">Dashboard</Link>}
        {!isAuthenticated && (
          <button className={styles.loginButton} onClick={autoLoginAdmin}>
            AutoLogInAdminThing
          </button>
        )}
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
                {" "}
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              href="/CreateAccount
       "
              passHref
            >
              <button className={styles.signupButton}>Sign up</button>
            </Link>
            <Link href="/Login" passHref>
              <button className={styles.loginButton}>login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
