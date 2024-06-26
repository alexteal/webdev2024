import { connect } from "mongoose";
import React, { useEffect, useRef, useState } from "react";
import mainStyle from "../../../app/page.module.css";
import styles from "./canvas.css";

const AWS = require('aws-sdk');

// Assuming environment variables are set for AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();


function dataUriToBlob(dataUri) {
  const binary = atob(dataUri.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
}

function uploadFileToS3(dataUri, bucketName, objectKey) {
  const blobData = dataUriToBlob(dataUri);

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: blobData,
    ContentType: 'image/png'
  };

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log('Error uploading data: ', err);
    } else {
      console.log('Successfully uploaded data to ' + bucketName + '/' + objectKey);
    }
  });
}







/**
 * Convert canvas data URI to blob object for S3
 */
// function dataUriToBlob(dataUri) {
//   var binary = atob(dataURI.split(",")[1]);
//   var array = [];
//   for (var i = 0; i < binary.length; i++) {
//     array.push(binary.charCodeAt(i));
//   }
//   return new Blob([new Uint8Array(array)], { type: "image/png" });
// }

const conn_str = process.env.MONGO_STR;
function DrawingComponent({ onExport, initialImageDataUrl }) {
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
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white"; // Set the fill color to white
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white, effectively clearing it
  };
  useEffect(() => {
    if (initialImageDataUrl) {
      loadInitialImage(initialImageDataUrl);
    }
  }, [initialImageDataUrl]);

  const loadInitialImage = (imageUrl) => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      contextRef.current.drawImage(image, 0, 0, 800, 300); // Adjust size as needed
    };
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
  const exportToImage = async () => {
    const canvas = canvasRef.current;
    console.log(canvas);
    const imageDataURL = canvas.toDataURL("image/png");
    onExport(imageDataURL); // Pass the image data URL to the parent component
    clearCanvas(); // Clear the canvas after exporting

    // Save it to S3
    // TODO: Convert to blob object so s3 can store the image, then pass that to mongoDB
    // Maybe you have to convert blob to file and then upload to S3?
    // const blob = dataUriToBlob(imageDataURL);
    canvas.toBlob((blob) => {
      if (blob === null) return;
      canvas.toBlob((blob) => {
        if (blob === null) return;
        s3.upload({
          Bucket: "your-bucket-name", // Make sure to specify your bucket name
          Key: "where/the/file/goes.png",
          Body: blob,
          ContentType: "image/png"
        }, (err, data) => {
          if (err) {
            console.log('Error uploading data:', err);
          } else {
            console.log('Successfully uploaded:', data.Location);
          }
        });
      });
    }, "image/png");

    // Save this to Mongo DB
    try {
      const res = await fetch("/api/drawings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "www.fakeUrl.com",
          userName: "testString",
        }),
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }
    } catch (e) {
      console.log(e);
    }
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
