"use client";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useAuth } from "../../components/Auth/index";
import styles from "./Header.module.css";

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    // Enable client-side specific rendering logic
    setClientSide(true);
  }, []);


  useEffect(() => {
    // This effect will run whenever the isLoggedIn state changes
    console.log("Logged in status:", isLoggedIn);
  }, [isLoggedIn]);

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };


  const logoutButton = () => {
    logout();
    window.location.reload();
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>PictoChat Clone</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
      </nav>
      <div className={styles.authStatus}>
        <h2>
        {getGreeting()}, {clientSide ? (isLoggedIn ? "Friend" : "Guest") : "Guest"}!
        </h2>
        {isLoggedIn ? (
          <div>
            <Link href="/">
              <button
                className={styles.logoutButton}
                onClick={() => logoutButton()}
              >
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/CreateAccount" passHref>
              <button className={styles.signupButton}>Sign up</button>
            </Link>
            <Link href="/Login" passHref>
              <button className={styles.loginButton}>Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;