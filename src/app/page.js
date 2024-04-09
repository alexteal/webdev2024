"use client";
import Link from "next/link";
import { useState } from "react";
import router from "next/router";
import styles from "./page.module.css";
import UsersList from "../components/Items/UsersList";
import User from "../components/Items/User";
import Header from "../components/Header";
import { useAuth, AuthProvider } from "../components/Auth/AuthContext";
import Canvas from "../components/Items/pictochat/canvas";
import ChatHistory from "@/components/Items/pictochat/chathistory";
const defaultUsers = [
  {
    id: 1,
    name: "Buzz Lightyear",
    age: 10,
    major: "Computer Science",
    img: "https://www.sideshow.com/storage/product-images/911427/buzz-lightyear-d-stage_disney_square.jpg", // Placeholder path, replace with actual
  },
  {
    id: 2,
    name: "Michael Cotterell",
    age: 35,
    major: "Computer Science",
    img: "https://www.cs.uga.edu/sites/default/files/styles/square_400x400/public/headshot.png?itok=msEVSbrg", // Placeholder path, replace with actual
  },
  {
    id: 3,
    name: "Courage The Cowardly Dog",
    age: 45,
    major: "Theatre & Animation",
    img: "https://pyxis.nymag.com/v1/imgs/0c2/a83/4cfc644e76854d6cfe92f58219d2273a25-14-courage-the-cowardly-dog.rsquare.w400.jpg",
  },
];
//primary routing
export default function Home() {
  const [users, setUsers] = useState(defaultUsers);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [chatHistoryUrls, setChatHistoryUrls] = useState([]);
  const addUserHandler = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };
  const handleExport = (dataUrl) => {
    setImageDataUrl(dataUrl);
    setChatHistoryUrls((prevUrls) => [...prevUrls, dataUrl]);
  };
  return (
    <>
      <AuthProvider>
        <Header />
        <main className={styles.main}>
          <UsersList users={users} />
          <button class="button">
            <Link href="/Login">Login</Link>
          </button>
          {chatHistoryUrls.map((url, index) => (
            <ChatHistory key={index} imageUrl={url} />
          ))}
          <Canvas onExport={handleExport} />
        </main>
      </AuthProvider>
    </>
  );
}
