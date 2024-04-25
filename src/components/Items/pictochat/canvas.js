import React, { useEffect, useRef, useState } from "react";
import mainStyle from "../../../app/page.module.css";
import styles from "./canvas.css";

function DrawingComponent({ onExport }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800 * 2; // Multiply by 2 for high resolution
    canvas.height = 300 * 2;
    canvas.style.width = `800px`; // CSS size
    canvas.style.height = `300px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2); // Adjust for high resolution
    context.fillStyle = "white"; // Set fill color to white
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white
    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white"; // Set the fill color to white
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white, effectively clearing it
  };
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const exportToImage = () => {
    const canvas = canvasRef.current;
    const imageDataURL = canvas.toDataURL("image/png");
    onExport(imageDataURL); // Pass the image data URL to the parent component
    clearCanvas(); // Clear the canvas after exporting
  };
  const downloadAndExport = () => {
    const canvas = canvasRef.current;
    const imageDataURL = canvas.toDataURL("image/png");
    // Create a link element
    const link = document.createElement("a");
    // Set the link's href to the image data URL
    link.href = imageDataURL;
    // Set the download attribute to the desired file name
    link.download = "image.png";
    // Append the link to the body
    document.body.appendChild(link);
    // Programmatically click the link to start the download
    link.click();
    // Remove the link from the body
    document.body.removeChild(link);
    onExport(imageDataURL); // Pass the image data URL to the parent component
    clearCanvas(); // Clear the canvas after exporting
  };
  return (
    //<div className={styles.canvasContainer}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "10px",
        padding: "10px",
        borderRadius: "10px",
        border: "5px solid grey",
        backgroundColor: "#fff",
      }}
    >
      <canvas
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        style={{ alignSelf: "center" }}
      />
      <button className="button" onClick={exportToImage}>
        Send!
      </button>
    </div>
  );
}
export default DrawingComponent;
