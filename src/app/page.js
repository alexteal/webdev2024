"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "../components/Header";
import { AuthProvider } from "../components/Auth/AuthContext";
import ChatView from "@/components/Items/pictochat/view";

//primary routing
export default function Home() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main className={styles.main}>
          <ChatView />
        </main>
      </AuthProvider>
    </>
  );
}
