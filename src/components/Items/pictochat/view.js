"use client";
import React, { useState } from "react"; // Removed unused imports
import { useAuth } from "@/components/Auth/AuthContext"; // Only import what's used
import ChatHistory from "./chathistory";
import Canvas from "../pictochat/canvas";
import styles from "./view.css";

function ChatView() {
  const { isAuthenticated, toggleAuth } = useAuth(); // Call useAuth as a function and destructure
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [chatHistoryUrls, setChatHistoryUrls] = useState([]);
  const imageUrls = ["/image0.png", "/image1.png", "/image2.png"];
  const handleExport = (dataUrl) => {
    setImageDataUrl(dataUrl);
    setChatHistoryUrls((prevUrls) => [...prevUrls, dataUrl]);
  };

  return (
    <div
      style={{
        height: "100vh", // or set a specific pixel value
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {isAuthenticated ? (
        <div>
          {" "}
          <div>
            <ChatHistory
              imageUrls={imageUrls.concat(chatHistoryUrls)}
              user="admin"
            />
          </div>
          <div style={{ flexGrow: "0" }}>
            <Canvas onExport={handleExport} />
          </div>
        </div>
      ) : (
        <>
          <h1 style={{ color: "black" }}>
            {" "}
            Login to send messages! Here's a preview of what you missed.
          </h1>
          <div className={styles.chatWrapper}>
            <ChatHistory
              imageUrls={imageUrls.concat(chatHistoryUrls)}
              user="admin"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatView;
