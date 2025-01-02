"use client";

import { useEffect, useContext } from "react";
import canvaContext from "../context/canvasContext";
let eraseSeleced = false;

// Function to initialize canvas and handle drawing
export function initCanvas(
  canvas,
  color,
  brushSize,
  reset,
  setReset,
  result,
  setResult
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Set canvas size to match display size
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };
  resize();
  window.addEventListener("resize", resize);

  // Drawing state
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // Drawing functions
  function startDrawing(e) {
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function draw(e) {
    if (!isDrawing) return;
    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color; // Use the selected color from context
    ctx.lineWidth = brushSize; // Use the selected brush size from context
    if (eraseSeleced) {
      ctx.lineWidth = 20;
      ctx.strokeStyle = "#000000"; // Use white color for eraser
    }
    ctx.stroke();

    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDrawing() {
    isDrawing = false;
  }

  // Helper to get position from event
  function getPos(e) {
    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX - canvas.offsetLeft;
      y = e.touches[0].clientY - canvas.offsetTop;
    } else {
      x = e.clientX - canvas.offsetLeft;
      y = e.clientY - canvas.offsetTop;
    }
    return { x, y };
  }

  // Clear the canvas when reset is triggered
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
  }

  if (reset) {
    clearCanvas();
    setReset(false);
  }

  const displayResultOnCanvas = (result) => {
    if (!result) return; // Return early if no result is provided

    // Clear previous result if necessary
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    alert(result);
    // Draw the result (you can customize font and positioning)
    ctx.font = "30px Arial";
    // Set text color
    ctx.fillStyle = "#FF4444"; // Red color for result text
    ctx.fillText(result, 50, 50); // Adjust positioning as needed
    setTimeout(() => {
      setResult(null);
    }, 2000);
  };

  // Display the result on canvas if it exists
  if (result) {
    console.log(result);
    console.log("result is displaying");
    displayResultOnCanvas(result);
  }

  // Event listeners
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // Touch events
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stopDrawing);

  // Cleanup function
  return () => {
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
    canvas.removeEventListener("mouseout", stopDrawing);
    canvas.removeEventListener("touchstart", startDrawing);
    canvas.removeEventListener("touchmove", draw);
    canvas.removeEventListener("touchend", stopDrawing);
  };
}

// DrawingCanvas Component
export default function DrawingCanvas() {
  const {
    color,
    brushSize,
    reset,
    erase,
    setReset,
    canvasRef,
    result,
    setResult,
  } = useContext(canvaContext);
  // const canvasRef = useRef(null);
  eraseSeleced = erase;
  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas is not mounted yet.");
      return;
    }
    const cleanup = initCanvas(
      canvasRef.current, // Pass the canvas element
      color, // Pass color from context
      brushSize, // Pass brushSize from context
      reset, // Pass reset from context
      setReset,
      result,
      setResult
    );

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, reset, setReset, result, brushSize]); // Re-run the effect when color, brushSize, or reset changes

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}
