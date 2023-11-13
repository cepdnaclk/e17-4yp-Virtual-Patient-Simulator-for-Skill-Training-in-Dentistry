import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";

const Test = ({onSubmit}) => {
  const [lines, setLines] = useState([]); // Initial lines state, which will hold the user's drawing
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("black"); // default color
  const [toolSize, setToolSize] = useState(2); // default size for both brush and eraser
  const [eraser, setEraser] = useState(false); // eraser mode
  const stageRef = useRef(null);
  const canvasWidth = 200;
  const canvasHeight = 200;

  const bigSquareSize = 200;
  const smallSquareSize = 100;
  const offset = (bigSquareSize - smallSquareSize) / 2;

  // rest of the handleMouseDown, handleMouseUp, handleMouseMove

  const handleCompareImages = async (userDrawingBlob , onResult) => {
    const formData = new FormData();
    formData.append("image1", userDrawingBlob, "user-drawing.png");
    formData.append(
      "image2",
      new Blob([await fetch("./1.png").then((r) => r.blob())], {
        type: "image/png",
      }),
      "1.png"
    );

    try {
      const response = await fetch(
        "https://us-central1-vitual-patient.cloudfunctions.net/compareImages",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { compatibility } = await response.json();
      const feedbackAndMarks = getMarksAndFeedback(compatibility, color);
      const { feedback, mark1, mark2 } = getMarksAndFeedback(compatibility, color);
      if (onResult) {
        onResult(mark1, mark2);
      }
      console.log(feedbackAndMarks); // Logs the feedback and marks
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // Feedback and marks calculation function
  const getMarksAndFeedback = (compatibilityScore, selectedColor) => {
    let feedback;
    let mark2;

    if (compatibilityScore >= 91) {
      feedback =
        "Excellent. The drawing is almost indistinguishable from the reference image or is exactly in the correct spot.";
      mark2 = 5;
    } else if (compatibilityScore >= 81) {
      feedback =
        "Good. The drawing has minor discrepancies from the reference image, but the key elements are in the right place.";
      mark2 = 4;
    } else if (compatibilityScore >= 71) {
      feedback =
        "Fair. The drawing is mostly in the correct area with some significant differences or is partially in the wrong place.";
      mark2 = 3;
    } else if (compatibilityScore >= 61) {
      feedback =
        "Poor. The drawing has substantial differences from the reference image or is in the wrong place.";
      mark2 = 2;
    } else {
      feedback =
        "Fail. The drawing does not match the reference image or is completely in the wrong place.";
      mark2 = 1;
    }

    // Determine mark1 based on the selected color
    let mark1 = selectedColor === "blue" ? 1 : 0;

    // Construct the results object
    return { feedback, mark1, mark2 };
  };

  // rest of the handleMouseDown, handleMouseUp, handleMouseMove
  const handleMouseDown = (e) => {
    setDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      {
        points: [pos.x, pos.y],
        color: eraser ? "white" : color,
        strokeWidth: toolSize,
        isEraser: eraser,
      },
    ]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines((prevLines) => {
      let lastLine = prevLines[prevLines.length - 1];
      // add point
      lastLine = {
        ...lastLine,
        points: [...lastLine.points, point.x, point.y],
      };

      // return the new array of lines
      return [...prevLines.slice(0, -1), lastLine];
    });
  };

  const downloadImage = () => {
    const stage = stageRef.current;
    const canvas = stage.toCanvas(); // Get the canvas element from your stage reference

    // Get the 2D context of the canvas
    const context = canvas.getContext("2d");

    // Get the image data from the context
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert each pixel to black or white
    for (let i = 0; i < data.length; i += 4) {
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const threshold = 128; // Midpoint between 0 and 255
      const color = average > threshold ? 255 : 0;
      data[i] = color; // red
      data[i + 1] = color; // green
      data[i + 2] = color; // blue
      // data[i + 3] is the alpha and does not need to be changed
    }

    // Put the black and white image data back to the context
    context.putImageData(imageData, 0, 0);

    // Convert the updated canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Create a dummy link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "user-drawing-black-and-white.png"; // Set the download filename
    document.body.appendChild(link);
    link.click(); // Simulate a click on the link
    document.body.removeChild(link); // Remove the dummy link
  };
  const handleSubmit = () => {
    const stage = stageRef.current;
    const canvas = stage.toCanvas(); // Get the canvas element from your stage reference

    // Get the 2D context of the canvas
    const context = canvas.getContext("2d");

    // Get the image data from the context
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert each pixel to black or white
    for (let i = 0; i < data.length; i += 4) {
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const threshold = 128; // Midpoint between 0 and 255
      const color = average > threshold ? 255 : 0;
      data[i] = color; // red
      data[i + 1] = color; // green
      data[i + 2] = color; // blue
      // data[i + 3] is the alpha channel (transparency) and does not need to be changed
    }

    // Put the modified image data back to the context
    context.putImageData(imageData, 0, 0);

    // Convert the updated canvas to a data URL
    canvas.toBlob((blob) => {
      // Now we have the blob, we can send it to the server
      handleCompareImages(blob,onSubmit);
    });
  };

  const handleColorChange = (event) => {
    // Turn off eraser when selecting a color
    setEraser(false);
    setColor(event.target.value);
  };

  const handleEraserToggle = () => {
    // Toggle eraser mode
    setEraser(!eraser);
    // Optionally, you might want to change the brush color back to black or any other color when eraser is turned off
    if (eraser) {
      setColor("black");
    }
  };

  const handleToolSizeChange = (event) => {
    setToolSize(event.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Changed to column to stack children vertically
        justifyContent: "center",
        alignItems: "center", // Center the children horizontally
        width: "400px",
        marginLeft: "-60px",
      }}
    >
      {/* Canvas Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // This centers the canvas horizontally
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Stage
          ref={stageRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ border: "2px solid black" }}
        >
          {/* ... Layers and shapes ... */}
          <Layer>
            {/* Canvas background */}
            <Rect
              width={bigSquareSize}
              height={bigSquareSize}
              stroke="black"
              strokeWidth={1}
            />
            <Rect
              x={offset}
              y={offset}
              width={smallSquareSize}
              height={smallSquareSize}
              stroke="black"
              strokeWidth={2}
            />
            {/* Static lines */}
            <Line
              points={[0, 0, offset, offset]}
              stroke="black"
              strokeWidth={2}
            />
            <Line
              points={[bigSquareSize, 0, bigSquareSize - offset, offset]}
              stroke="black"
              strokeWidth={2}
            />
            <Line
              points={[0, bigSquareSize, offset, bigSquareSize - offset]}
              stroke="black"
              strokeWidth={2}
            />
            <Line
              points={[
                bigSquareSize,
                bigSquareSize,
                bigSquareSize - offset,
                bigSquareSize - offset,
              ]}
              stroke="black"
              strokeWidth={2}
            />
          </Layer>
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.isEraser ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Controls Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <select onChange={handleColorChange} style={{ marginRight: "10px" }}>
          {/* ... Options ... */}
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
        <input
          type="range"
          min="1"
          max="50"
          value={toolSize}
          onChange={handleToolSizeChange}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleEraserToggle}>
          {eraser ? "Pen" : "Eraser"}
        </button>
      </div>

      {/* Submit Button Row */}
      <div style={{ width: "100%" }}>
        <button onClick={handleSubmit} style={{ width: "100%" }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Test;
