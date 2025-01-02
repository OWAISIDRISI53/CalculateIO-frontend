import { useRef, useState } from "react";
import CanvasContext from "./canvasContext";

const CanvasState = (props) => {
  const [color, setColor] = useState("#1ABC9C");
  const [brushSize, setBrushSize] = useState(3);
  const [reset, setReset] = useState(false);
  const [erase, setErase] = useState(false);
  const [dictOfVars, setDictOfVars] = useState({});
  const canvasRef = useRef(null); // Shared canvas reference

  const [result, setResult] = useState(null);

  const URL = "http://localhost:8900/calculate";

  const [error, setError] = useState(null);

  const runRoute = async () => {
    if (canvasRef) {
      try {
        const image = canvasRef.current.toDataURL("image/png");
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: image,
            dict_of_vars: dictOfVars,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the API");
        }

        const resp = await response.json();
        console.log(resp);
        // console.log("Response", resp[0].result);

        if (
          resp.status === "success" &&
          Array.isArray(resp.data) &&
          resp.data.length > 0
        ) {
          const resultData = resp.data[0]; // Get the first object in the data array

          const resultShow = resultData.result; // Access the result field
          const expr = resultData.expr;
          setResult(`${expr} = ${resultShow}`); // Assuming the result is in data[0]
          console.log("Result:", resultShow);
        }

        resp.data.forEach((data) => {
          if (data.assign === true) {
            setDictOfVars((prevVars) => ({
              ...prevVars,
              [data.expr]: data.result,
            }));
          }
        });
        setError(null); // Clear any previous error
      } catch (err) {
        console.error("Error during API request:", err);
        setError("An error occurred while calculating. Please try again.");
      }
    }
  };

  return (
    <CanvasContext.Provider
      value={{
        color,
        setColor,
        brushSize,
        setBrushSize,
        reset,
        setReset,
        erase,
        setErase,
        runRoute,
        error,
        result,
        setResult,
        canvasRef,
      }}
    >
      {/*  eslint-disable-next-line react/prop-types */}
      {props.children}
    </CanvasContext.Provider>
  );
};

export default CanvasState;
