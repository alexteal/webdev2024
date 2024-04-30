"use client";
import ChatView from "@/components/Items/pictochat/view";
import Link from "next/link";
import { AuthProvider } from "../components/Auth/AuthContext";
import Header from "../components/Header";
import styles from "./page.module.css";

//primary routing
export default function Home() {
  return (
    <>
        <Header/>
        <main className={styles.main}>
          <ChatView />
        </main>
    </>
  );
}
