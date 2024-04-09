"use client";
import React, { useState } from "react"; // Removed unused imports
import { useAuth } from "@/components/Auth/AuthContext"; // Only import what's used
import ChatHistory from "./chathistory";
import Canvas from "../pictochat/canvas";

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
    <div>
      {isAuthenticated ? (
        <>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt="image" />
              <h2>From admin</h2>
            </div>
          ))}{" "}
          {chatHistoryUrls.map((url, index) => (
            <ChatHistory key={index} imageUrl={url} user="admin" />
          ))}
          <Canvas onExport={handleExport} />
        </>
      ) : (
        <>
          <h1> Login to send messages! Here's a preview of what you missed.</h1>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt="image" />
              <h2>From admin</h2>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ChatView;
