"use client";
import React, { useState } from "react"; // Removed unused imports
import { useAuth } from "@/components/Auth/AuthContext"; // Only import what's used
import ChatHistory from "./chathistory";
import Canvas from "../pictochat/canvas";
import styles from "./view.css";

function ChatView() {
  const { isAuthenticated, toggleAuth } = useAuth(); // Call useAuth as a function and destructure
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [currentImage, setCurrentImage] = useState(null); // State to track the current selected image
  const [chatHistoryUrls, setChatHistoryUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState(["/image0.png", "/image1.png", "/image2.png"]);
  
  const handleExport = (dataUrl) => {
    setImageDataUrl(dataUrl);
    setChatHistoryUrls((prevUrls) => [...prevUrls, dataUrl]);
  };

  const deleteImage = (imageUrl) => {
    setImageUrls(prevUrls => prevUrls.filter(url => url !== imageUrl));
  };
  
  const handleImageSelect = (imageUrl) => {
    setCurrentImage(imageUrl); // Set the selected image to be the current image
  };
  const handleImageSave = (editedDataUrl) => {
    const updatedUrls = chatHistoryUrls.map(url =>
      url === currentImage ? editedDataUrl : url
    );
    setChatHistoryUrls(updatedUrls);
    setCurrentImage(editedDataUrl); // Update current image to the new edited one
  };
  function pressImage() {
    
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
              onImageSelect={handleImageSelect}
              deleteImage={deleteImage}
            />
          </div>
          <div style={{ flexGrow: "0" }}>
            <Canvas initialImageDataUrl={currentImage} onExport={handleExport} />
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
              disableButton = "true"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatView;
