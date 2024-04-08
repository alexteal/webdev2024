import React, { useRef, useEffect, useState } from 'react';
import styles from "./canvas.css";
import mainStyle from "../../../app/page.module.css"

function DrawingComponent({onExport}) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 400 * 2; // Multiply by 2 for high resolution
        canvas.height = 300 * 2;
        canvas.style.width = `400px`; // CSS size
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
        const context = canvas.getContext('2d');
        context.fillStyle = 'white'; // Set the fill color to white
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
        const imageDataURL = canvas.toDataURL('image/png');
        onExport(imageDataURL); // Pass the image data URL to the parent component
        clearCanvas(); // Clear the canvas after exporting
    };

    return (
        <div className={styles.canvasContainer}>
            <canvas
                className={styles.canvas}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
            <button class="button" className={mainStyle} onClick={exportToImage}>Send!</button>
        </div>
    );
}
export default DrawingComponent;