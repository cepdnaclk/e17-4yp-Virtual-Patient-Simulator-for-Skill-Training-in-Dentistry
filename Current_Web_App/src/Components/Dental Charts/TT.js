import React, { useState } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";

const ToothComponent = ({ expectedColor, expectedArea }) => {
  const [drawingData, setDrawingData] = useState([]);
  const [currentColor, setCurrentColor] = useState("black");
  const [isDrawing, setIsDrawing] = useState(false);

  const bigSquareSize = 200;
  const smallSquareSize = 100;
  const offset = (bigSquareSize - smallSquareSize) / 2;

  const isInSquare = (x, y) => {
    return x > 0 && y > 0 && x < bigSquareSize && y < bigSquareSize;
  };

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if (isInSquare(pos.x, pos.y)) {
      setIsDrawing(true);
      setDrawingData((prevData) => [
        ...prevData,
        { color: currentColor, points: [pos.x, pos.y] },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    if (isInSquare(pos.x, pos.y)) {
      setDrawingData((prevData) => {
        const lastData = { ...prevData[prevData.length - 1] };
        lastData.points = [...lastData.points, pos.x, pos.y];
        return [...prevData.slice(0, -1), lastData];
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    // Here you can add the logic to check if the drawing matches the expected area and color
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        Select Color:
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect
            width={bigSquareSize}
            height={bigSquareSize}
            fill="white"
            stroke="black"
            strokeWidth={2}
          />
          <Rect
            x={offset}
            y={offset}
            width={smallSquareSize}
            height={smallSquareSize}
            fill="white"
            stroke="black"
            strokeWidth={2}
          />
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

          {drawingData.map((data, idx) => (
            <Line
              key={idx}
              points={data.points}
              stroke={data.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={"source-over"}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ToothComponent;
