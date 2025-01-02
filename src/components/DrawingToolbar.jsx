import { useContext } from "react";
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

  const handleCalculate = async () => {
    runRoute();
  };

  return (
    <div className="flex flex-col w-full h-screen bg-black">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-6 p-2 bg-neutral-900">
        <div className="logo text-2xl text-white font-semibold tracking-wider font-mono">
          CalculateIO
        </div>
        <div className="flex items-center gap-2 px-4">
          {colors.map((colorOption) => (
            <button
              key={colorOption.id}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
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

        <Button
          onClick={() => setErase(true)}
          variant="secondary"
          size="sm"
          aria-label="Link tool"
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
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </Button>
        <div className="flex items-center gap-4 px-4">
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
          <Slider
            min={1}
            max={10}
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32"
            aria-label="Brush size"
          />
          <span className="text-sm text-neutral-400">{brushSize}px</span>
        </div>
        <Button
          onClick={() => {
            setReset(true);
          }}
          variant="destructive"
          size="sm"
        >
          Reset
        </Button>
        <Button onClick={handleCalculate} className="ml-auto">
          Calculate
        </Button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-black">
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
