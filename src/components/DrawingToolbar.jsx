import { useContext, useState } from "react";
import { Button } from "../utils/Button";
import { Slider } from "../utils/Slider";
import DrawingCanvas from "./DrawingCanvas";
import canvaContext from "../context/canvasContext";

const colors = [
  { id: "black", value: "#000000" },
  { id: "white", value: "#FFFFFF" },
  { id: "red", value: "#FF4444" },
  { id: "pink", value: "#FF69B4" },
  { id: "purple", value: "#9B59B6" },
  { id: "brown", value: "#8B4513" },
  { id: "blue", value: "#3498DB" },
  { id: "cyan", value: "#1ABC9C" },
  { id: "green", value: "#2ECC71" },
  { id: "lime", value: "#A4DE02" },
  { id: "yellow", value: "#F1C40F" },
  { id: "orange", value: "#E67E22" },
];

const DrawingToolbar = () => {
  const {
    color,
    setColor,
    brushSize,
    setBrushSize,
    setReset,
    setErase,
    runRoute,
  } = useContext(canvaContext);

  const [showColorPalette, setShowColorPalette] = useState(false);

  const handleCalculate = async () => {
    runRoute();
  };

  return (
    <div className="flex flex-col w-full h-screen bg-black">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6 p-2 bg-neutral-900">
        <div className="logo text-xl sm:text-2xl text-white font-semibold tracking-wider font-mono mb-2 sm:mb-0">
          CalculateIO
        </div>
        <div className="flex flex-wrap items-center gap-2 px-2 sm:px-4 mb-2 sm:mb-0">
          <Button
            onClick={() => setShowColorPalette(!showColorPalette)}
            variant="secondary"
            size="sm"
            className="sm:hidden"
            aria-label="Toggle color palette"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2v20M2 12h20"></path>
            </svg>
          </Button>
          <div
            className={`flex flex-wrap gap-2 ${
              showColorPalette ? "block" : "hidden sm:flex"
            }`}
          >
            {colors.map((colorOption) => (
              <button
                key={colorOption.id}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-transform ${
                  color === colorOption.value
                    ? "border-white scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: colorOption.value }}
                onClick={() => setColor(colorOption.value)}
                aria-label={`Select ${colorOption.id} color`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 px-2 sm:px-4 mb-2 sm:mb-0">
          <Button
            onClick={() => setErase(false)}
            variant="secondary"
            size="sm"
            aria-label="Pen tool"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </Button>
          <Button
            onClick={() => setErase(true)}
            variant="secondary"
            size="sm"
            aria-label="Eraser tool"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L21 10C21.5 10.5 21.5 11.5 21 12L13 20" />
              <path d="M6 11L13 18" />
            </svg>
          </Button>
          <div className="flex items-center gap-2">
            <Slider
              min={1}
              max={10}
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-24 sm:w-32"
              aria-label="Brush size"
            />
            <span className="text-sm text-neutral-400">{brushSize}px</span>
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button
            onClick={() => {
              setReset(true);
            }}
            variant="destructive"
            size="sm"
          >
            Reset
          </Button>
          <Button onClick={handleCalculate}>Calculate</Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-black overflow-auto">
        <DrawingCanvas
          id="drawingCanvas"
          className="w-full h-full"
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
};

export default DrawingToolbar;
