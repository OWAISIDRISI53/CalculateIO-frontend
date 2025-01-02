import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import CanvasState from "./context/CanvasState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CanvasState>
      <App />
    </CanvasState>
  </StrictMode>
);
