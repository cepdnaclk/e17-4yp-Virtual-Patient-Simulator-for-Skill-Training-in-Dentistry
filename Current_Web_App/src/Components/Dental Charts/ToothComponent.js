import React, { useState } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";

const pointInPolygon = (point, polygon) => {
  const x = point[0],
    y = point[1];
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0],
      yi = polygon[i][1];
    const xj = polygon[j][0],
      yj = polygon[j][1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

const ToothComponent = ({ expectedColor, expectedArea }) => {
  const [drawingData, setDrawingData] = useState([]);
  const [currentColor, setCurrentColor] = useState("black");
  const [isDrawing, setIsDrawing] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const bigSquareSize = 200;
  const smallSquareSize = 100;
  const offset = (bigSquareSize - smallSquareSize) / 2;

  const referenceShapePoints = [50, 50, 150, 70, 100, 150, 50, 120];

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
  };

  const handleSubmit = () => {
    const coveredPercentage = evaluateCoverage(
      drawingData,
      referenceShapePoints,
      bigSquareSize
    );
    setEvaluation(coveredPercentage);
  };

  const evaluateCoverage = (
    drawingData,
    referenceShapePoints,
    bigSquareSize
  ) => {
    const gridSize = 10;

    console.log("bigSquareSize:", bigSquareSize);
    console.log("gridSize:", gridSize);

    const gridRows = Math.floor(bigSquareSize / gridSize);
    const gridCols = Math.floor(bigSquareSize / gridSize);

    console.log("gridRows:", gridRows);
    console.log("gridCols:", gridCols);

    let grid = Array(gridRows)
      .fill()
      .map(() => Array(gridCols).fill({ reference: false, drawing: false }));

    let referencePolygonPoints = [];
    for (let i = 0; i < referenceShapePoints.length; i += 2) {
      referencePolygonPoints.push([
        referenceShapePoints[i],
        referenceShapePoints[i + 1],
      ]);
    }

    // Initialize referenceCount at the beginning of your function
    let referenceCount = 0;

    // Step 2: Mark cells covered by the reference shape
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        const cellCenter = [(i + 0.5) * gridSize, (j + 0.5) * gridSize];
        if (pointInPolygon(cellCenter, referencePolygonPoints)) {
          grid[i][j].reference = true;
          referenceCount++;
        }
      }
    }

    // Step 3: Mark cells covered by the user's drawing
    drawingData.forEach((data) => {
      for (let i = 0; i < data.points.length - 2; i += 2) {
        const x = Math.floor(data.points[i] / gridSize);
        const y = Math.floor(data.points[i + 1] / gridSize);
        if (x >= 0 && x < gridRows && y >= 0 && y < gridCols) {
          grid[x][y].drawing = true;
        }
      }
    });

    // Step 4: Calculate the overlap percentage
    let overlapCount = 0;

    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        if (grid[i][j].reference) {
          if (grid[i][j].drawing) {
            overlapCount++;
          }
        }
      }
    }

    const coveredPercentage = (overlapCount / referenceCount) * 100;
    return coveredPercentage.toFixed(2) + "%";
  };

  return (
    <div>
      {/* ... (same as before, with additional elements as below) */}
      <div style={{ marginBottom: "10px" }}>
        Select Color:
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px", marginLeft: "50px" }}>
        9. Observe the painfull tooth shown by the patient. Mark on the chart
        using correct color codes
      </div>
      <button style={{ zIndex: 1000 }} onClick={handleSubmit}>
        Submit
      </button>
      {evaluation && <div>Coverage: {evaluation}</div>}
      {/* {evaluation && <div>Submitted !</div>} */}

      <Stage
        style={{ marginLeft: "550px", marginTop: "50px" }}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {/* ... (same as before) */}
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
          <Line
            points={referenceShapePoints}
            stroke="red"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            x={bigSquareSize + 20}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default ToothComponent;
