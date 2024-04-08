"use client";
import React from "react"; // Removed unused imports
import styles from './Header.module.css';
import { useAuth } from '../Auth/AuthContext'; // Only import what's used

function Header() {
  const { isAuthenticated, toggleAuth } = useAuth; // Call useAuth as a function and destructure

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
        <a href="/">Home</a>
        {/* <a href="/about">About Us</a>
        <a href="/contact">Contact</a> */}
        {isAuthenticated && <a href="/dashboard">Dashboard</a>}
      </nav>
      <div className={styles.authStatus}>
        <h2>{getGreeting()}, { isAuthenticated ? 'User' : 'Guest'}!</h2>
        {isAuthenticated ? (
          <div>
            <button className={styles.logoutButton} onClick={() => toggleAuth()}>Logout</button>
          </div>
        ) : (
          <h2>Not authenticated</h2>
        )}
      </div>
    </header>
  );
}

export default Header;